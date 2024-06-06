"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PersonalDetails = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        const response = await fetch(`/api/users/${session.user.id}`);
        const userDetails = await response.json();
        console.log("user details ", userDetails);
        setUser(userDetails);
      } else {
        console.log("session doesnt exist");
      }
    };
    fetchUser();
  }, [session]);
  return (
    <div className="grid h-full w-full place-items-center">
      {session ? (
        <div className="grid grid-cols-2 gap-10 text-4xl dark:text-gray-200">
          <p className="text-left">Name</p>
          <p>{user.applicantName}</p>
          <p className="text-left">Email</p>
          <p>{user.email}</p>
          <p className="text-left">
            Grade in 12<sup>th</sup>
          </p>
          <p>{user.gradeIn12}</p>
          <p className="text-left">
            Grade in 10<sup>th</sup>
          </p>
          <p>{user.gradeIn10}</p>
        </div>
      ) : (
        <div className="flex gap-10">
          <h2>Please login first to view details.</h2>
          <button
            className="rounded-lg bg-primary px-4"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;
