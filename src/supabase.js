import { createClient } from "@supabase/supabase-js";
require("dotenv").config();

const options = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.REACT_APP_URL,
  process.env.REACT_APP_ANON_PUBLIC,
  options
);

export default supabase;
