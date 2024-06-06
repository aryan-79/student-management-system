import User from "@/models/users";
import connectDb from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  console.log("id :", id);
  try {
    await connectDb();
    const user = await User.findById(id);
    console.log("user", user);
    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse(error.message, { status: 400 });
  }
};
