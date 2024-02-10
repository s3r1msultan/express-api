import { Schema, model } from "mongoose";

const blog = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
  },
  { collection: "blog" }
);

export const Blog = model("Blog", blog);
