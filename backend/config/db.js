const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Optional: for development without a real DB running, we could swallow the error 
    // or provide mock setup. For a robust setup, process exit is typical.
    // process.exit(1);
    console.warn("Continuing without MongoDB connection. You may need to use Mock API endpoints or ensure MongoDB is running.");
  }
};

module.exports = connectDB;
