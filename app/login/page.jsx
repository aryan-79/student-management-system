"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
const LoginPage = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const handleSignIn = async () => {
    //   await signIn("credentials", { ...data, redirect: false });
    // };
    const success = await signIn("credentials", { ...data, redirect: false });
    if (success.ok) {
      router.push("/");
    }
  };
  return (
    <div className="flex h-full min-w-[400px] flex-col justify-center gap-24">
      <div className="mt-10 flex flex-col items-center">
        <div className="relative -z-10 h-20 w-20 rounded-full">
          <Image
            src="/logo.png"
            height={150}
            width={150}
            alt="logo"
            className="object-cover"
          />
        </div>
        <h1 className="text-xl font-semibold text-gray-700 md:text-2xl">
          Login to your account.
        </h1>
      </div>
      <form
        className="flex min-w-full flex-col justify-center"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email" className="style-label block">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email address"
            required
            className="style-input"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password" className="style-label block" hidden>
            Password
          </label>
          <input
            type="text"
            name="password"
            placeholder="Enter your password"
            className="style-input"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <input type="submit" className="mt-6 rounded-md bg-primary px-2" />
      </form>
    </div>
  );
};

export default LoginPage;
