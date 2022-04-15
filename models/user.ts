import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true, select: false },
  openAll: Boolean,
  pushToken: { type: String, unique: true },
});

export default mongoose.model("user", User);
