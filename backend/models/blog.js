import { Schema, model } from "mongoose";
import { isEmptyString } from "./validator.js";

const blog = new Schema(
  {
    title: { type: String, required: true, unique: true, validate: isEmptyString },
    author: { type: String, required: true, validate: isEmptyString },
    content: { type: String, required: true, validate: isEmptyString },
    createdAt: { type: Date, default: Date.now(), immutable: true, required:true },
    updatedAt: { type: Date, default: Date.now(), required: true },
  },
  { 
    collection: "blog",
    timestamps: true,
  }
);

export const Blog = model("Blog", blog);
