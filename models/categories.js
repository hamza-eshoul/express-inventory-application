// Require Mongoose
const mongoose = require("mongoose");

// Define the categories schema
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  nbrItems: {
    type: Number,
    required: true,
    min: 1,
  },
});

// Virtual for categorie's URL
categorySchema.virtual("url").get(function () {
  return `/carModels/categories_list/${this.id}`;
});

categorySchema.virtual("updateUrl").get(function () {
  return `/carModels/category/update/${this.id}`;
});

categorySchema.virtual("deleteUrl").get(function () {
  return `/carModels/category/delete/${this.id}`;
});

// Compiling our schema into a Model and exporting it
module.exports = mongoose.model("categories", categorySchema);
