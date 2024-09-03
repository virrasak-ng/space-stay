import mongoose from "mongoose";

// Define the schema
const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
  number: Number,
});

// Check if the model already exists to avoid OverwriteModelError
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
