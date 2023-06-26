const Category = require("../models/categories");
const Items = require("../models/items");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.categories_index = asyncHandler(async (req, res, next) => {
  const NumberOfCategories = await Category.countDocuments();
  const NumberOfCars = await Items.countDocuments();
  const NumberOfCarsPerCat = await Items.countDocuments({ category: "SUV" });

  const CarMaxPrice = await Items.find({}, { price: 1, _id: 0 })
    .sort({ price: -1 })
    .limit(1);

  const CarMinPrice = await Items.find({}, { price: 1, _id: 0 })
    .sort({ price: 1 })
    .limit(1);

  res.render("index", {
    nbrCategories: NumberOfCategories,
    nbrCars: NumberOfCars,
    nbrCarsPerCat: NumberOfCarsPerCat,
    maxPrice: CarMaxPrice[0].price,
    minPrice: CarMinPrice[0].price,
  });
});

// Render list of all categories
exports.categories_list = asyncHandler(async (req, res, next) => {
  const CarCategories = await Category.find({});

  res.render("categories_list", {
    CarCategories: CarCategories,
  });
});

// Render detail page for a specific category
exports.categories_detail = asyncHandler(async (req, res, next) => {
  const categoryDetail = await Category.findById(req.params.categoryId);
  const categoryItems = await Items.find({ category: categoryDetail.name });

  res.render("category_detail", {
    categoryDetail: categoryDetail,
    categoryItems: categoryItems,
  });
});

// Create new Category (don't need the asyncHandler because the function doesn't contain any code that can throw an exception)
exports.category_create_get = (req, res, next) => {
  // Form UI to create a category
  res.render("category_form", {
    title: "Create Category",
    updateCategory: {
      name: "",
      description: "",
    },
  });
};

// Array of middleware functions to append the new category to the database
exports.category_create_post = [
  // Validate and sanitize the form fields
  body("categoryName", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body(
    "categoryDescription",
    "Category description must contain at least 10 characters"
  )
    .trim()
    .isLength({ min: 10 })
    .escape(),

  // Process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data
    const category = new Category({
      name: req.body.categoryName,
      description: req.body.categoryDescription,
      nbrItems: 1,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with error messages
      res.render("category_form", {
        title: "Create Category",
        errors: errors.array(),
        updateCategory: {
          name: "",
          description: "",
        },
      });
      return;
    } else {
      // Data form is valid
      // Check if category with same name already exists.
      const categoryExists = await Category.findOne({
        name: req.body.categoryName,
      });

      if (categoryExists) {
        // Category exists, redirect to its detail page
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        // New category saved. Redirect to category detail page
        res.redirect(category.url);
      }
    }
  }),
];

// Update existing category
exports.category_update_get = async (req, res, next) => {
  const updateCategory = await Category.findById(req.params.categoryId);
  // Form UI to update a category
  res.render("category_form", {
    title: "Update Category",
    updateCategory: updateCategory,
  });
};

exports.category_update_post = [
  // Validate and sanitize the form fields
  body("categoryName", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body(
    "categoryDescription",
    "Category description must contain at least 10 characters"
  )
    .trim()
    .isLength({ min: 10 })
    .escape(),

  // Process the request after validation and sanitization

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from the request
    const errors = validationResult(req);

    // Update the category

    const updateCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $set: {
          name: req.body.categoryName,
          description: req.body.categoryDescription,
        },
      }
    );

    if (!errors.isEmpty()) {
      // There are errors. Render form again with error messages
      const updateCategory = await Category.findById(req.params.categoryId);

      res.render("category_form", {
        title: "Update Category",
        updateCategory: updateCategory,
        errors: errors.array(),
      });
      return;
    } else {
      // Data form is valid
      // Update the category
      await updateCategory.save();
      // Redirect to category detail page
      res.redirect(updateCategory.url);
    }
  }),
];

// Delete category
exports.category_delete_get = async (req, res, next) => {
  const categoryDelete = await Category.findById(req.params.categoryId);

  res.render("category_delete", {
    categoryDelete: categoryDelete,
  });
};

exports.category_delete_post = async (req, res, next) => {
  const categoryDelete = await Category.findById(req.params.categoryId);
  const categoryItems = await Items.find({ category: categoryDelete.name });

  // Check if the category has items
  if (categoryItems.length === 0) {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.redirect("/carModels/categories_list");
  } else {
    res.render("category_delete", {
      categoryDelete: categoryDelete,
      errorCategoryItems: categoryItems,
    });
  }
};
