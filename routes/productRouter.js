const router = require("express").Router();

const { Product } = require("../models");

const product = require("../controller/productController");

const upload = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkOwnership");
const checkId = require("../middlewares/checkId");

router.post("/", autentikasi, upload.single("image"), product.createProduct);
router.get("/", autentikasi, checkRole("Owner"), product.findProducts);
router.get("/:id", checkId(Product), product.findProductById);
router.patch(
  "/:id",
  checkId(Product),
  autentikasi,
  checkRole("Owner"),
  checkOwnership.checkShopOwner,
  product.updateProduct
);
router.delete(
  "/:id",
  checkId(Product),
  autentikasi,
  checkRole("Owner"),
  checkOwnership.checkShopOwner,
  product.deleteProduct
);

module.exports = router;
