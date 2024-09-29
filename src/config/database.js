const mongoose = require("mongoose");
const uri = "mongodb+srv://abubakir:abubakir@cluster0.gwpz3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  try {
    await mongoose.connect(uri).then(() => console.log("Connected to MongoDB using Mongoose!")).catch(err => console.log("Error connecting"))
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
