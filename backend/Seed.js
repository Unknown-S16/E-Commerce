const mongoose = require("mongoose");
require('dotenv').config();
const Data = require("./pack/Data") ;

mongoose.connect(process.env.MongoDB)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("Connection error:", err));

// Define product schema
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  desc: String,
  rating: Number,
  image: String,
  category: String
});

const Product = mongoose.model("Product", productSchema);


// Seed function
const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(Data);
  console.log("Database seeded!");


  mongoose.disconnect();
};

seedDB();
