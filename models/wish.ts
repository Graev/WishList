import mongoose from "mongoose";

const Wish = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  img: String,
  link: String,
  price: String,
  creator: {
    type: "ObjectId",
    ref: "user",
    description: "_id user",
    required: true,
  },
  openAll: Boolean,
  openFor: [
    {
      type: "ObjectId",
      ref: "user",
      description: "_id user",
    },
  ],
  category: [
    {
      type: "ObjectId",
      ref: "category",
      description: "_id category",
    },
  ],
  region: String,
  dateCreate: { type: Date, default: () => new Date() },
});

export default mongoose.model("wish", Wish);
