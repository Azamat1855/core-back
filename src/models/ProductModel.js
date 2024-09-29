const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true, default: 0 },
  quantity: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("Products", ProductSchema);
