import express from "express";
import dotenv from "dotenv";
import { router } from "./routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ health: "Ok" });
});
app.use(router);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
