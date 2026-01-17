import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString:
    "postgresql://postgres:Create123@supabase@db.ufkjzaptaauzznrvwspm.supabase.co:5432/postgres",
});
