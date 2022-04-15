import mongoose from "mongoose";

const Event = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date },
  wishs: [
    {
      type: "ObjectId",
      ref: "wish",
      description: "_id wish",
    },
  ],
  guests: [
    {
      type: "ObjectId",
      ref: "user",
      description: "_id user",
    },
  ],
  creator: {
    type: "ObjectId",
    ref: "user",
    description: "_id user",
    required: true,
  },
});

export default mongoose.model("event", Event);
