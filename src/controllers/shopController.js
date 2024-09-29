const Products = require("../models/ProductModel");
const Auth = require("../models/AuthModel");
const ProductCode = require("../models/ProductCodeModel");

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const buyProduct = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    let product = await Products.findById(id);
    let student = await Auth.findById(userId);

    if (!product || !product.quantity) {
      return res
        .status(404)
        .json({ message: "Product not found or out of stock" });
    }

    if (!student || student.role.toLowerCase() !== "student") {
      return res
        .status(400)
        .json({ message: "You aren't a student or student not found" });
    }

    if (product.price > student.coin) {
      return res.status(400).json({ message: "Not enough coins" });
    }

    product.quantity -= 1;
    student.coin -= product.price;

    await Products.findByIdAndUpdate(id, { quantity: product.quantity });
    await Auth.findByIdAndUpdate(userId, { coin: student.coin });

    let verificationCode;
    do {
      verificationCode = generateRandomString(10);
    } while (await ProductCode.findOne({ code: verificationCode }));

    await ProductCode.create({
      product: id,
      student: userId,
      code: verificationCode,
    });

    res.status(200).json({
      message: `You have successfully purchased a ${product.title}`,
      code: verificationCode,
      coins: `Your coins: ${student.coin}`,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};

const checkProductCode = async (req, res) => {
  const { code } = req.body;
  try {
    const product = await ProductCode.findOne({ code })
      .populate("student", "name surname")
      .populate("product", "title");

    if (!product || product.code !== code) {
      return res.status(404).json({ message: "Incorrect Code" });
    }

    res.status(200).json({
      message: "Code is correct",
      id: product._id,
      product: product.product.title,
      student: `${product.student.name} ${product.student.surname}`,
      code: product.code,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProductCode = async (req, res) => {
  const { id } = req.params;
  try {
    const productCode = await ProductCode.findByIdAndDelete(id);

    if (!productCode) {
      return res.status(404).json({ message: "Product code not found" });
    }

    res.status(200).json({ message: "Product code deleted successful" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { buyProduct, checkProductCode, deleteProductCode };
