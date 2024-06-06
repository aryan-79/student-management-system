import connectDb from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/users";
import ApplicationData from "@/models/application";
import bcrypt from "bcrypt";
export const POST = async (request) => {
  const { applicantName, email, password, gradeIn12, gradeIn10 } =
    await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await connectDb();
    const newUser = new User({
      applicantName,
      email,
      hashedPassword,
      gradeIn12,
      gradeIn10,
    });
    await newUser.save();
    return NextResponse.json(newUser);
  } catch (error) {
    return new NextResponse(error.message, { status: 400 });
  }
};

export const DELETE = async (request) => {
  const { id } = await request.json();
  // console.log("Delete data ", data);
  // console.log("_id type", typeof id);
  try {
    await connectDb();
    const applicant = await ApplicationData.findByIdAndDelete(id);
    console.log("applicant ", applicant);
    return NextResponse.json(applicant);
  } catch (error) {
    return new NextResponse("Operation Failed");
  }
};
