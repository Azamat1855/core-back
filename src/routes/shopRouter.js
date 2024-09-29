const router = require("express").Router();
const {
  buyProduct,
  checkProductCode,
  deleteProductCode,
} = require("../controllers/shopController");

router.post("/buy/:id", buyProduct);
router.post("/check-code", checkProductCode);
router.delete("/check-code/delete/:id", deleteProductCode);

module.exports = router;
