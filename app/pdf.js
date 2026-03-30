import pdf from "pdf-parse/node/lib";

export async function parsePDF(buffer) {
  // Now 'pdf' should be the function
  const data = await pdf(buffer);
  return data.text;
}
