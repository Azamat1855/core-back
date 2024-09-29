const mongoose = require("mongoose");

const ProductCodeSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Types.ObjectId, ref: 'Auth', required: true },
    product: { type: mongoose.Types.ObjectId, ref: 'Products', required: true },
    code: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductCode", ProductCodeSchema);
