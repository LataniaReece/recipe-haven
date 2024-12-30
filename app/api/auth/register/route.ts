import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import supabase from "@/lib/supabase";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    // Check if email already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email is already registered.",
        },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const { data: newUser, error } = await supabase
      .from("users")
      .insert([{ email, hashed_password: hashedPassword }])
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error("Error registering user:", error.message);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
