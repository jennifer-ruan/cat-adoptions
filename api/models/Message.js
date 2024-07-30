const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  cat: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
