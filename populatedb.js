const Category = require("./models/categories");
const Items = require("./models/items");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  // await Category.updateMany({ nbrItems: 1 }, { $set: { nbrItems: 6 } });
  // await createCategories();
  // await createItems();
}

// Create categories
async function categoryCreate(name, desc, nbrItems) {
  const category = new Category({
    name: name,
    description: desc,
    nbrItems: nbrItems,
  });

  await category.save();
}

async function createCategories() {
  await Promise.all([
    categoryCreate(
      "SUV",
      "Sports Utility Vehicle referring to slylish, sleek looking vehicle that offer elegant city driving ",
      1
    ),
    categoryCreate(
      "Hatchback",
      "Vehicule with four doors and a hatch at the rear-end that flips up, based on a two-box body for the engine and passenrs or cargo.",
      1
    ),
    categoryCreate(
      "Sedan",
      "A four-door car with a closed trunk and separate compartments for passengers and cargo.",
      1
    ),
    categoryCreate(
      "Sports Car",
      "High-performance vehicles with powerful engines, two seats, and a focus on speed and handling.",
      1
    ),
  ]);
}

// Create items
async function itemCreate(name, desc, category, price, nbrInStock) {
  const item = new Items({
    name: name,
    description: desc,
    category: category,
    price: price,
    nbrInStock: nbrInStock,
  });

  await item.save();
}

async function createItems() {
  await Promise.all([
    // SUV cars
    itemCreate(
      "Ford Explorer",
      "A versatile and spacious SUV with advanced safety features.",
      "SUV",
      32000,
      Math.floor(Math.random() * 100)
    ),
    itemCreate(
      "Toyota RAV4",
      "A popular compact SUV known for its reliability and fuel efficiency.",
      "SUV",
      40000,
      Math.floor(Math.random() * 100)
    ),
    itemCreate(
      "BMW X5",
      "A popular compact SUV known for its reliability and fuel efficiency.",
      "SUV",
      60000,
      Math.floor(Math.random() * 100)
    ),
    itemCreate(
      "Jeep Wrangler",
      "An iconic off-road SUV known for its ruggedness and versatility.",
      "SUV",
      35000,
      Math.floor(Math.random() * 100)
    ),
    itemCreate(
      "Audi Q5",
      "A premium mid-size SUV with a comfortable and stylish interior.",
      "SUV",
      45000,
      Math.floor(Math.random() * 100)
    ),
    itemCreate(
      "Honda CR-V",
      "A reliable and practical SUV with a spacious interior and excellent safety ratings.",
      "SUV",
      28000,
      Math.floor(Math.random() * 100)
    ),

    // Sedan Cars
    itemCreate(
      "Toyota Camry",
      "A reliable and comfortable sedan with advanced features.",
      "Sedan",
      25000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Honda Civic",
      "A sporty and fuel-efficient sedan with a sleek design.",
      "Sedan",
      22000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Volkswagen Jetta",
      "A stylish and spacious sedan with impressive performance.",
      "Sedan",
      23000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Ford Fusion",
      "A well-rounded sedan with a comfortable interior and modern technology.",
      "Sedan",
      25000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Chevrolet Malibu",
      "A sleek and practical sedan with excellent safety ratings.",
      "Sedan",
      25000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Nissan Altima",
      "A reliable and efficient sedan with a roomy interior.",
      "Sedan",
      24000,
      Math.floor(Math.random() * 100)
    ),

    // Hatchback
    itemCreate(
      "Volkswagen Golf",
      "A versatile and compact hatchback with a comfortable interior.",
      "Hatchback",
      20000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Ford Fiesta",
      "A small and efficient hatchback with agile handling.",
      "Hatchback",
      18000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Honda Fit",
      "A practical and spacious hatchback with flexible cargo options.",
      "Hatchback",
      19000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Toyota Yaris",
      "An affordable and fuel-efficient hatchback with user-friendly features.",
      "Hatchback",
      17000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Hyundai i30",
      "A stylish and well-equipped hatchback with a smooth ride.",
      "Hatchback",
      21000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Mazda3",
      "A sporty and upscale hatchback with advanced safety features.",
      "Hatchback",
      22000,
      Math.floor(Math.random() * 100)
    ),

    // Sports Car
    itemCreate(
      "Porsche 911",
      "An iconic and high-performance sports car with timeless design.",
      "Sports Car",
      100000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Chevrolet Corvette",
      "A powerful and exhilarating sports car with impressive speed.",
      "Sports Car",
      60000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Ferrari 488 GTB",
      "A stunning and agile sports car known for its exceptional performance.",
      "Sports Car",
      300000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "BMW M3",
      "A thrilling and dynamic sports car with luxurious features.",
      "Sports Car",
      70000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Audi R8",
      "A striking and powerful sports car with cutting-edge technology.",
      "Sports Car",
      150000,
      Math.floor(Math.random() * 100)
    ),

    itemCreate(
      "Nissan GT-R",
      "A legendary and high-performance sports car with impressive handling.",
      "Sports Car",
      80000,
      Math.floor(Math.random() * 100)
    ),
  ]);
}
