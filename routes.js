import express from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import { pool } from "./db.js";
import { chunkText } from "./chunker.js";
// import { embed } from "./embedding.js";
import { askLLM } from "./llm.js";
// import { parsePDF } from "./pdf.js";
import { embed } from "./localEmbedding.js";
function toPgVector(array) {
  return `[${array.join(",")}]`;
}

const upload = multer();
export const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  const text = req.file.buffer.toString("utf-8");
  // const text =
  //   req.file.mimetype === "application/pdf"
  //     ? await parsePDF(req.file.buffer)
  //     : req.file.buffer.toString("utf-8");
  const documentId = uuid();
  console.log("yes i was here and ");

  await pool.query("INSERT INTO documents (id, filename) VALUES ($1, $2)", [
    documentId,
    req.file.originalname,
  ]);

  const chunks = chunkText(text);

  for (const chunk of chunks) {
    const embedding = await embed(chunk);
    console.log(typeof embedding[0] === "number");

    await pool.query(
      `INSERT INTO chunks (id, document_id, content, embedding)
       VALUES ($1, $2, $3, $4)`,
      [uuid(), documentId, chunk, toPgVector(embedding)],
    );
  }

  res.json({ success: true });
});

router.post("/ask", async (req, res) => {
  const { question } = req.body;
  const queryEmbedding = await embed(question);

  const result = await pool.query(
    `
    SELECT content
    FROM chunks
    ORDER BY embedding <-> $1::vector
    LIMIT 5
    `,
    [toPgVector(queryEmbedding)],
  );

  if (result.rows.length === 0) {
    return res.json({
      answer:
        "I could not find relevant information in the uploaded documents.",
    });
  }

  const context = result.rows.map((r) => r.content).join("\n");

  // const answer = await askLLM(context, question);
  res.json({ context });
});
