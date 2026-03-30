# RAG ask-your-docs – Backend


## LIVE : https://ask-your-docs-frontend.vercel.app/

This repository contains the **backend service** for the RAG (Retrieval Augmented Generation) Document Assistant.

The backend handles the **document processing pipeline, embeddings generation, vector storage, and LLM responses**. It exposes APIs that allow the frontend to upload documents and ask questions related to those documents.

---

## 🚀 Overview

The backend powers the core functionality of the application. It processes uploaded documents, converts them into embeddings, stores them in a vector database, and retrieves relevant context when users ask questions.

The retrieved context is then passed to a Large Language Model (LLM) to generate a **structured and meaningful response**.

---

## ⚙️ Features

* Document upload processing
* Text extraction from files (PDF, TXT, DOC/DOCX)
* Document chunking
* Embedding generation
* Vector storage using Supabase
* Semantic search for relevant document chunks
* LLM-powered response generation
* REST APIs for frontend integration

---

## 🧠 How It Works

1. User uploads a document.
2. The backend extracts the text.
3. The text is split into smaller chunks.
4. Embeddings are generated for each chunk.
5. Embeddings are stored in a Supabase vector database.
6. When a user asks a question:

   * The query is converted into an embedding
   * Relevant chunks are retrieved
   * Context is sent to the LLM
7. The LLM generates the final answer.

---

## 🏗 Tech Stack

* Node.js
* Express.js
* Supabase (Vector Database)
* LLM API
* Embeddings API

---

## 🔌 API Endpoints

### Upload Document

```http
POST /upload
```

Uploads a document and processes it for embeddings.

### Ask Question

```http
POST /ask
```

Accepts a user question and returns an AI-generated response based on the document content.



Follow me : https://github.com/hacetheworld
