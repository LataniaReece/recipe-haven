import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({ is_new_user: false })
      .eq("id", userId)
      .select("id, email, favorites, is_new_user")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      message: "User status updated successfully.",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        favorites: updatedUser.favorites,
        isNewUser: updatedUser.is_new_user,
      },
    });
  } catch (error: any) {
    console.error("Error updating user:", error.message);
    return NextResponse.json(
      { error: "Failed to update user status." },
      { status: 500 }
    );
  }
}
