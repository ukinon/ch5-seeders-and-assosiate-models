const router = require("express").Router();

const shop = require("../controller/shopController");

const { Shop } = require("../models");

const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkOwnership");
const checkId = require("../middlewares/checkId");

router.post("/", autentikasi, checkRole("Owner"), shop.createShop);
router.get("/", shop.findShops);
router.get("/:id", checkId(Shop), shop.findShopById);
router.patch(
  "/:id",
  checkId(Shop),
  autentikasi,
  checkRole("Owner"),
  checkOwnership.checkShopOwner,
  shop.updateShop
);
router.delete(
  "/:id",
  checkId(Shop),
  autentikasi,
  checkRole("Owner"),
  checkOwnership.checkShopOwner,
  shop.deleteShop
);

module.exports = router;
