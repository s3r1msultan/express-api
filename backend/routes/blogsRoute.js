import { Router } from "express";
import { Blog } from "../models/blog.js";

const blogsRoute = Router();

blogsRoute.get("/post", (req, res) => {
  if (req.method !== "GET") {
    res.status(405).send("Method not allowed");
  }
  res.render("post");
});

blogsRoute.post("/", (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.status(201);
      res.render("post", { status: 201 });
    })
    .catch((err) => {
      console.error(err);
      res.status(400);
      res.render("post", { status: 400 });
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
      res.status(200);
      res.render("blog", { blog: blog });
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

blogsRoute.get("/:id/edit", (req, res) => {
  if(req.method !== "GET") 
    res.send(405).send("Method not allowed")
  Blog.findById(req.params.id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: "Blog is not found with id " + req.params.id,
        });
      }
      res.status(200);
      res.render("edit", { blog: blog });
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
})

blogsRoute.put("/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((blog) => {
      console.log(blog.author)
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
