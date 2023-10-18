const { Shop, Product, User } = require("../models");
const ApiError = require("../utils/apiError");

const createShop = async (req, res, next) => {
  try {
    let { name, product } = req.body;
    const userId = req.user.id;

    const findUserId = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (findUserId.shopId !== null) {
      next(new ApiError("This user already has a shop", 400));
    } else {
      const newShop = await Shop.create({
        name,
        include: ["Users"],
      });
      findUserId.update({
        shopId: newShop.id,
      });
      await findUserId.save();

      res.status(200).json({
        status: "Success",
        data: {
          newShop,
        },
      });
    }
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findShops = async (req, res, next) => {
  try {
    const { name } = req.query;
    const condition = {};
    if (name) {
      condition.name = name;
    }
    const Shops = await Shop.findAll({
      where: condition,
      include: ["Users", "Products"],
    });

    res.status(200).json({
      status: "Success",
      data: {
        Shops,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findShopById = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({
      where: {
        id: req.params.id,
      },
      include: ["Users", "Products"],
    });

    if (shop === null) {
      res.status(400).json({
        status: "failed",
        message: "shop doesn't exist",
      });
    }

    res.status(200).json({
      status: "Success",
      data: {
        shop,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateShop = async (req, res, next) => {
  const { name, price, stock } = req.body;
  try {
    const shop = await Shop.update(
      {
        name,
        price,
        stock,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteShop = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!shop) {
      next(new ApiError("Shop id tersebut gak ada", 404));
    }

    await Shop.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createShop,
  findShops,
  findShopById,
  updateShop,
  deleteShop,
};
