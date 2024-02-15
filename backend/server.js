import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import blogsRoute from "./routes/blogsRoute.js";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "frontend", "styles")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "frontend", "views", "pages"));

mongoose
  .connect(process.env.MONGODB_URL + process.env.DATABASE)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use("/blogs", blogsRoute);
app.get("/", (req ,res)=>{
  if(req.method !== "GET") 
    res.status(405).send("Method not allowed");
  res.render("index")
})

app.listen(process.env.PORT || 3000, () => {
  console.log("server listening on port " + process.env.PORT || 3000);
});
