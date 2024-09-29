const router = require("express").Router();
const {
  getProducts,
  getProductById,
  createProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/create", createProducts);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
