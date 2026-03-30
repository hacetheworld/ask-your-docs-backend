import { createClient } from "redis";

const redis  = createClient({
  url: "redis://redis:6379"
});

redis.on("error", (err) => {
  console.error("Redis error", err);
});

export async function initRedis() {
  await redis.connect();

  console.log("Redis connected");

  await ensureVectorIndex();
}

async function ensureVectorIndex() {
  try {
    await redis.sendCommand(["FT.INFO", "idx:questions"]);
    console.log("Redis vector index exists");
  } catch (err) {
    console.log("Creating Redis vector index...");

    await redis.sendCommand([
      "FT.CREATE",
      "idx:questions",
      "ON",
      "HASH",
      "PREFIX",
      "1",
      "question:",
      "SCHEMA",
      "embedding",
      "VECTOR",
      "FLAT",
      "6",
      "TYPE",
      "FLOAT32",
      "DIM",
      "1536",
      "DISTANCE_METRIC",
      "COSINE",
    ]);

    console.log("Vector index created");
  }
}

export default redis;