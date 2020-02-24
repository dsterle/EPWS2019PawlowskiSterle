const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paintingSchema = new Schema({
  id: String,
  title: String,
  imgSrc: [String],
  img: [],
  dated: Number,
  infos: [{ id: Number, name: String, inhalt: String, audioSrc: String }]
});

module.exports = mongoose.model("Painting", paintingSchema);