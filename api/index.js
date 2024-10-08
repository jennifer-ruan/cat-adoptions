const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Cat = require("./models/Cat");
const Message = require("./models/Message");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "karma";

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(newUser);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      jwt.sign(
        { email: user.email, id: user._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw error;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id, type } = await User.findById(userData.id);
      res.json({ name, email, _id, type });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const photosMiddleware = multer({ dest: "/uploads" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { originalname, path } = req.files[i];
    const targetPath = __dirname + "/uploads/" + originalname;

    try {
      fs.renameSync(path, targetPath);
      uploadedFiles.push(targetPath.replace(`${__dirname}/uploads/`, ""));
    } catch (err) {
      console.error("File processing error:", err);
    }
  }
  res.json(uploadedFiles);
});

app.post("/cats", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { name, age, location, photos, description, preferences } = req.body;
  const cat = await Cat.create({
    shelter: userData.id,
    name,
    age,
    location,
    photos,
    description,
    preferences,
  });
  res.json(cat);
});

app.get("/cats", async (req, res) => {
  res.json(await Cat.find());
});

app.get("/user-cats", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { id } = userData;
  res.json(await Cat.find({ shelter: id }));
});

app.get("/cats/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Cat.findById(id));
});

app.put("/cats", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { id, name, age, location, photos, description, preferences } =
    req.body;
  const catData = await Cat.findById(id);
  if (catData.shelter.toString() === userData.id) {
    catData.set({
      name,
      age,
      location,
      photos,
      description,
      preferences,
    });
    await catData.save();
    res.json("okay");
  }
});

app.delete("/cats/:id", async (req, res) => {
  const { id } = req.params;
  const userData = await getUserDataFromReq(req);

  const catData = await Cat.findById(id);
  if (!catData) {
    return res.status(404).json({ error: "Cat not found" });
  }
  if (!catData.shelter === userData.id) {
    return res.status(400).json({ error: "Cat does not belong to this user" });
  }
  try {
    await Cat.findByIdAndDelete(id);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the cat" });
  }
});

app.post("/messages", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { cat, message, parentMessageId } = req.body;

  console.log("This is the data", message, parentMessageId);

  if (!parentMessageId) {
    // This is the first message
    const catData = await Cat.findById(cat);
    if (!catData) {
      return res.status(404).json({ error: "Cat not found" });
    }

    const messageObject = await Message.create({
      cat,
      sender: userData.id,
      recipient: catData.shelter,
      message,
      replies: [],
    });
    res.json(messageObject);
  } else {
    const parentMessage = await Message.findById(parentMessageId);
    if (!parentMessage) {
      return res.status(404).json({ error: "Message not found" });
    }
    const firstSender = parentMessage.sender;
    const firstRecipient = parentMessage.recipient;
    const replyObject = {
      sender: userData.id,
      recipient: userData.id === firstSender ? firstRecipient : firstSender,
      message,
      replies: [],
    };
    parentMessage.replies.push(replyObject);
    await parentMessage.save();
    res.json({ message: "Reply added successfully", parentMessage });
  }
});

app.get("/messages", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const messages = await Message.find({
    $or: [{ sender: userData.id }, { recipient: userData.id }],
  }).populate("cat");
  res.json(messages);
});

app.get("/messages/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Message.findById(id).populate("cat");
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json([message, ...message.replies]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving replies" });
  }
});

app.listen(4000);

//gHNh57YbtNGh71Cb
