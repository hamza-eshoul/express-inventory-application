const categories = require("../models/categories");
const Category = require("../models/categories");
const items = require("../models/items");
const Items = require("../models/items");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.items_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({});
  const items = await Items.find({});

  res.render("items_list", {
    categories: categories,
    items: items,
  });
});

exports.items_detail = asyncHandler(async (req, res, next) => {
  const itemDetail = await Items.findById(req.params.itemId);
  res.render("items_detail", {
    itemDetail: itemDetail,
  });
});

// Create new item
exports.item_create_get = async (req, res, next) => {
  const categories = await Category.find({});

  // Form UI to create an item
  res.render("item_form", {
    title: "Create Item",
    categories: categories,
    items: {
      name: "",
      description: "",
      price: "",
      nbrInStock: "",
    },
  });
};

// Array of middleware functions to append the new item to the database
exports.item_create_post = [
  // Validate and sanitize the form fields
  body("itemName", "Item name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("itemDescription", "Item description must contain at least 6 characters")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("itemPrice", "Item price must at least be 15000")
    .trim()
    .isInt({ min: 15000 })
    .escape(),
  body("itemNbrStock", "Item number in stock must not be empty")
    .trim()
    .isInt({ min: 1 })
    .escape(),

  // Process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from the request
    const errors = validationResult(req);

    // Create an item object with sanitized data
    const item = new Items({
      name: req.body.itemName,
      description: req.body.itemDescription,
      category: req.body.itemCategory,
      price: req.body.itemPrice,
      nbrInStock: req.body.itemNbrStock,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with error messages
      const categories = await Category.find({});

      res.render("item_form", {
        title: "Create Item",
        categories: categories,
        errors: errors.array(),
        items: {
          name: "",
          description: "",
          price: "",
          nbrInStock: "",
        },
      });
      return;
    } else {
      // Data form is valid
      // Check if item with same name already exists.
      const itemExists = await Items.findOne({ name: req.body.itemName });

      if (itemExists) {
        // Item exists, redirect to its detail page
        res.redirect(itemExists.url);
      } else {
        await item.save();
        // New item saved. Redirect to item detail page
        res.redirect(item.url);
      }
    }
  }),
];

// Update Item
exports.item_update_get = async (req, res, next) => {
  // Form UI to update an item
  const categories = await Category.find({});
  const items = await Items.findById(req.params.itemId);

  res.render("item_form", {
    title: "Update Item",
    categories: categories,
    items: items,
  });
};

exports.item_update_post = [
  // Validate and sanitize data
  body("itemName", "Item name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("itemDescription", "Item description must contain at least 6 characters")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("itemPrice", "Item price must at least be 15000")
    .trim()
    .isInt({ min: 15000 })
    .escape(),
  body("itemNbrStock", "Item number in stock must not be empty")
    .trim()
    .isInt({ min: 1 })
    .escape(),

  // Process the request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from the request
    const errors = validationResult(req);

    // Update the item
    const updateItem = await Items.findByIdAndUpdate(req.params.itemId, {
      $set: {
        name: req.body.itemName,
        description: req.body.itemDescription,
        category: req.body.itemCategory,
        price: req.body.itemPrice,
        nbrInStock: req.body.itemNbrStock,
      },
    });

    // Check for errors
    if (!errors.isEmpty()) {
      // There are errors. Render the update form with error message
      const categories = await Category.find({});
      const items = await Items.findById(req.params.itemId);

      res.render("item_form", {
        title: "Update Item",
        categories: categories,
        items: items,
        errors: errors.array(),
      });
      return;
    } else {
      // Data form is valid
      // Update the category
      await updateItem.save();
      // Redirect to category detail page
      res.redirect(updateItem.url);
    }
  }),
];

// Delete item

exports.item_delete_get = async (req, res, next) => {
  const itemDelete = await Items.findById(req.params.itemId);
  res.render("item_delete", {
    itemDelete: itemDelete,
  });
};

exports.item_delete_post = async (req, res, next) => {
  // Find the item to be deleted in the DB
  await Items.findByIdAndDelete(req.params.itemId);

  res.redirect("/carModels/items_list");
};
