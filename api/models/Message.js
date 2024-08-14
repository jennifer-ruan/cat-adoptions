const mongoose = require("mongoose");
const { Schema } = mongoose;

const replySchema = new Schema({
  message: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, required: true },
  sentAt: { type: Date, default: Date.now },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

const messageSchema = new Schema({
  cat: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Cat" },
  message: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, required: true },
  sentAt: { type: Date, default: Date.now },
  replies: [replySchema],
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
