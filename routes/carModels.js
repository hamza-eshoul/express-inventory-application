const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoriesController");
const itemsController = require("../controllers/itemsController");

// Categories Routes
router.get("/", categoryController.categories_index);

router.get("/categories_list", categoryController.categories_list);

router.get(
  "/categories_list/:categoryId",
  categoryController.categories_detail
);

router.get("/category/create", categoryController.category_create_get);

router.post("/category/create", categoryController.category_create_post);

router.get(
  "/category/update/:categoryId",
  categoryController.category_update_get
);

router.post(
  "/category/update/:categoryId",
  categoryController.category_update_post
);

router.get(
  "/category/delete/:categoryId",
  categoryController.category_delete_get
);

router.post(
  "/category/delete/:categoryId",
  categoryController.category_delete_post
);

// Items Routes
router.get("/items_list", itemsController.items_list);

router.get("/items_list/:itemId", itemsController.items_detail);

router.get("/item/create", itemsController.item_create_get);

router.post("/item/create", itemsController.item_create_post);

router.get("/item/update/:itemId", itemsController.item_update_get);

router.get("/item/delete/:itemId", itemsController.item_delete_get);

router.post("/item/delete/:itemId", itemsController.item_delete_post);

module.exports = router;
