import connectDb from "@/utils/db";
import ApplicationData from "@/models/application";
import { NextResponse } from "next/server";
export const POST = async (req) => {
  const data = await req.json();
  // console.log(data);
  try {
    await connectDb();
    if (data) {
      const newApplication = new ApplicationData({
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        gradeIn12: data.gradeIn12,
        gradeIn10: data.gradeIn10,
      });
      await newApplication.save();
      return NextResponse.json(newApplication);
    }
  } catch (error) {
    console.log("error", error);
    if (error.code === 11000) {
      console.log("Email must be unique");
      return NextResponse.json(
        { error: "Email already exists.", code: 1100 },
        { status: 400 }
      );
    }
    return new NextResponse("Failed to submit application", { status: 400 });
  }
};

export const GET = async (req, res) => {
  try {
    await connectDb();
    const applicationData = await ApplicationData.find();
    // console.log("application data response sent from api", applicationData);
    return NextResponse.json(applicationData);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return new NextResponse("Failed to fetch application data", {
      status: 400,
    });
  }
};
