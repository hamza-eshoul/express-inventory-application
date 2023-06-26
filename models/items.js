// Require mongoose
const mongoose = require("mongoose");

// Define the items schema
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  nbrInStock: {
    type: Number,
    required: true,
  },
  // URL to be defined
});

// Virtual for item's URL
itemsSchema.virtual("url").get(function () {
  return `/carModels/items_list/${this.id}`;
});

itemsSchema.virtual("updateUrl").get(function () {
  return `/carModels/item/update/${this.id}`;
});

itemsSchema.virtual("deleteUrl").get(function () {
  return `/carModels/item/delete/${this.id}`;
});

// Compiling our schema into a Model and exporting it
module.exports = mongoose.model("Items", itemsSchema);
