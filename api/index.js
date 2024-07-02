const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Cat = require("./models/Cat");
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
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
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

app.post("/cats", (req, res) => {
  const { token } = req.cookies;
  const { name, age, location, photos, description } = req.body;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const cat = await Cat.create({
        shelter: userData.id,
        name,
        age,
        location,
        photos,
        description,
      });
      res.json(cat);
    });
  }
});

app.listen(4000);

//gHNh57YbtNGh71Cb
