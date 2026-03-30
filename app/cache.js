import redis from "./redis.js";

export async function findSimilar(vector) {
  const buffer = Buffer.from(Float32Array.from(vector).buffer);

  const result = await redis.sendCommand([
    "FT.SEARCH",
    "idx:questions",
    "*=>[KNN 1 @embedding $vec AS score]",
    "PARAMS",
    "2",
    "vec",
    buffer,
    "SORTBY",
    "score",
    "RETURN",
    "2",
    "answer",
    "score",
    "DIALECT",
    "2",
  ]);

  if (result.length < 2) {
    return null;
  }

  const score = parseFloat(result[3]);

  if (score < 0.15) {
    return result[2];
  }

  return null;
}

export async function storeEmbedding(id, vector, answer) {
  const buffer = Buffer.from(Float32Array.from(vector).buffer);

  await redis.hSet(`question:${id}`, {
    embedding: buffer,
    answer: answer,
  });
}