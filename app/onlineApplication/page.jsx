"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const OnlineForm = () => {
  // const personalDetails = {
  //   firstName: {
  //     label: "First Name",
  //     placeholder: "Your first name (required)",
  //     required: true,
  //   },
  //   midName: {
  //     label: "Middle Name",
  //     placeholder: "Your second name (optional)",
  //     required: false,
  //   },
  //   lastName: {
  //     label: "Last Name",
  //     placeholder: "Your last name (required)",
  //     required: true,
  //   },
  // };
  const router = useRouter();
  const [data, setData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    gradeIn12: "F",
    gradeIn10: "F",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
    const application = await fetch("/api/online-application", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await application.json();
    // console.log("reponse: ", responseData);
    if (!application.ok) {
      alert(responseData.error);
    } else {
      alert("Form has been submitted");
      router.push("/");
    }
  };
  return (
    <div className="min-h-full min-w-[80vw] md:min-w-[65vw] xl:min-w-[30vw] flex flex-col justify-center gap-4">
      <div className="mt-10 flex flex-col items-center">
        <div className="h-20 w-20 rounded-full relative -z-10">
          <Image
            src="/logo.png"
            height={150}
            width={150}
            alt="logo"
            className="object-cover"
          />
        </div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-700">
          Online application form
        </h1>
      </div>
      <form className=" flex flex-col justify-center" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName" className="style-label block">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Your first name (required)"
            required
            className="style-input"
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="middleName" className="style-label block">
            Middle Name
          </label>
          <input
            type="text"
            name="middleName"
            placeholder="Your middle name(optional)"
            className="style-input"
            onChange={(e) => setData({ ...data, middleName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="style-label block">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Your first name(required)"
            required
            className="style-input"
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email" className="style-label block">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Your email address(required)"
            required
            className="style-input"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="gradeIn12" className="style-label">
            12<sup>th</sup> Grade
          </label>
          <select
            name="gradeIn12"
            required
            defaultValue="F"
            className="style-select"
            onChange={(e) => setData({ ...data, gradeIn12: e.target.value })}
          >
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        </div>
        <div>
          <label htmlFor="gradeIn10" className="style-label">
            10<sup>th</sup> Grade
          </label>
          <select
            name="gradeIn10"
            required
            defaultValue="F"
            className="style-select"
            onChange={(e) => setData({ ...data, gradeIn10: e.target.value })}
          >
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        </div>

        <input type="submit" className="rounded-md bg-primary px-2 mt-2" />
      </form>
    </div>
  );
};

export default OnlineForm;
