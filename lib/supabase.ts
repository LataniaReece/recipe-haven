import { createClient } from "@supabase/supabase-js";

interface User {
  id: string;
  email: string;
  hashed_password: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User; // Row represents the structure of a record in the `users` table
        Insert: Omit<User, "id">; // Insert type excludes fields like `id` or `created_at`
        Update: Partial<Omit<User, "id">>; // Update allows partial updates
      };
    };
  };
}

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export default supabase;
