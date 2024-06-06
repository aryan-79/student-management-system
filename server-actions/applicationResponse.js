"use server";
import { generateRandomString } from "@/utils/passwordGenerator";
import { revalidatePath } from "next/cache";
export const acceptApplication = async (application) => {
  // console.log("accept application ", application);
  const {
    _id: id,
    firstName,
    middleName,
    lastName,
    email,
    gradeIn12,
    gradeIn10,
  } = application;
  // console.log("id", id);
  const applicantName = middleName
    ? `${firstName} ${middleName} ${lastName}`
    : `${firstName} ${lastName}`;
  const password = generateRandomString(10);
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/application-response`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        applicantName,
        email,
        password,
        gradeIn12,
        gradeIn10,
      }),
    }
  );
  if (response.ok) {
    const delApplication = await fetch(
      `${process.env.NEXTAUTH_URL}/api/application-response`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    if (!delApplication.ok) {
      throw new Error("Failed to delete application");
    }
    revalidatePath("/admin");
  }
};

export const rejectApplication = async (id) => {
  // console.log("rejected id", id);
  const rejected = await fetch(
    `${process.env.NEXTAUTH_URL}/api/application-response`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );
  if (!rejected.ok) {
    throw new Error("Failed to delete application");
  }
  revalidatePath("/admin");
};
