import { Router } from "express";
import { Blog } from "../models/blog.js";

const blogsRoute = Router();

blogsRoute.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
});

blogsRoute.get("/", (req, res) => {
  Blog.find()
    .then((blogs) => {
      res.status(200);

      res.render("blogs", { blogs: blogs, title: "All blogs" });
    })
    .catch((err) => res.status(500).send(err));
});

blogsRoute.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: "Blog is not found with id " + req.params.id,
        });
      }
      res.status(200).send(blog);
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
});

blogsRoute.delete("/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: "Blog is not found with id " + req.params.id,
        });
      }
      res.status(200).send(blog);
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
});

blogsRoute.put("/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: "Blog is not found with id " + req.params.id,
        });
      }
      res.status(200).send(blog);
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
});

export default blogsRoute;
