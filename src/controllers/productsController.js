const Products = require("../models/ProductModel");

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (!products.length) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.log("ERROR: ", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log("ERROR: ", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const createProducts = async (req, res) => {
  const { image, title, description, price, quantity } = req.body;
  try {
    const newProduct = await Products.create({
      image,
      title,
      description,
      price,
      quantity,
    });

    res.status(201).json({ message: "Product created", data: newProduct });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successful" });
  } catch (error) {
    console.log("ERROR: ", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { image, title, description, price, quantity } = req.body;

  try {
    const currentProduct = await Products.findById(id);
    let currentQuantity = currentProduct.quantity
    
    if (quantity) {
      currentQuantity += quantity;
    }

    const product = await Products.findByIdAndUpdate(
      id,
      { image, title, description, price, quantity: currentQuantity },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("ERROR: ", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProducts,
  deleteProduct,
  updateProduct,
};
