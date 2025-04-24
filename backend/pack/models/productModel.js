const {  mongoose } = require("mongoose");
const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    desc: String,
    rating: Number,
    image: String,
  });
  
  const Product = mongoose.model('Product', productSchema);

module.exports=Product;