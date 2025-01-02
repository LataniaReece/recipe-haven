import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

// Handle GET requests (fetch all favorites)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required." },
      { status: 400 }
    );
  }

  try {
    const { data: favorites, error } = await supabase
      .from("favorites")
      .select("recipe")
      .eq("user_id", userId);

    if (error) throw error;

    return NextResponse.json({ favorites: favorites.map((fav) => fav.recipe) });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch favorites." },
      { status: 500 }
    );
  }
}

// Handle POST requests (add favorite)
export async function POST(req: Request) {
  const { userId, recipe } = await req.json();

  if (!userId || !recipe) {
    return NextResponse.json(
      { error: "User ID and recipe data are required." },
      { status: 400 }
    );
  }

  try {
    const { error } = await supabase.from("favorites").insert({
      user_id: userId,
      recipe,
    });

    if (error) throw error;

    // Fetch updated favorites
    const { data: favorites, error: fetchError } = await supabase
      .from("favorites")
      .select("recipe")
      .eq("user_id", userId);

    if (fetchError) throw fetchError;

    return NextResponse.json({ favorites: favorites.map((fav) => fav.recipe) });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add favorite." },
      { status: 500 }
    );
  }
}

// Handle DELETE requests (remove favorite)
export async function DELETE(req: Request) {
  const { userId, recipe } = await req.json();

  console.log(userId);
  console.log(recipe);
  if (!userId || !recipe) {
    return NextResponse.json(
      { error: "User ID and recipe data are required." },
      { status: 400 }
    );
  }

  try {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("recipe->>id", recipe.id);

    if (error) throw error;

    // Fetch updated favorites
    const { data: favorites, error: fetchError } = await supabase
      .from("favorites")
      .select("recipe")
      .eq("user_id", userId);

    if (fetchError) throw fetchError;

    return NextResponse.json({ favorites: favorites.map((fav) => fav.recipe) });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to remove favorite." },
      { status: 500 }
    );
  }
}
