
// Backend Logic
require("dotenv").config();
const postRoutes=require("./pack/routes/Routes")
const authRoutes=require("./pack/routes/auth")

const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const app=express();
app.use(cors({
  origin: "https://e-commerce-ivory-two.vercel.app/", 
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/products",postRoutes)


async function ConnectDB() {
  try{
  mongoose.connect(process.env.MongoDB)
  console.log("mongo db is connected");
}
catch(err){
  console.log("mongo db is not connected",err);
}
}
ConnectDB();

const server = app.listen(process.env.PORT,()=>
  console.log("server is running on port",process.env.PORT)
)
server.on("error",(err)=>console.log("Server failed to start",err));