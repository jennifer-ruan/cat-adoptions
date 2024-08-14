const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  cat: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Cat" },
  message: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, required: true },
  read: { type: Boolean, default: false },
  reply: { type: mongoose.Schema.Types.ObjectId },
  sentAt: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
