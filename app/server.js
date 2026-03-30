import express from "express";
import dotenv from "dotenv";
import { router } from "./routes.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { initRedis } from "./redis.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `windowMs`
  message: "Too many requests from this IP, please try again after 15 minutes"
});
const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ health: "Ok" });
});
app.use("/",apiLimiter,router);


async function start() {
  await initRedis();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();