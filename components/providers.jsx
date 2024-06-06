"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
const Providers = ({ children, session }) => {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
