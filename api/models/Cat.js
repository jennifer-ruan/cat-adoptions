const mongoose = require("mongoose");
const { Schema } = mongoose;

const catSchema = new Schema({
  shelter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  age: Number,
  location: String,
  photos: [String],
  description: String,
  preferences: [String],
});

const CatModel = mongoose.model("Cat", catSchema);

module.exports = CatModel;
