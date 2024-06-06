"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
const Navbar = () => {
  const { data: session, status } = useSession();
  console.log("session", session);
  let isAdmin = false;
  const router = useRouter();
  const pathname = usePathname();
  const options = [
    {
      title: "Student Info",
      subOptions: [
        { name: "Personal Details", key: "personalDetails" },
        { name: "Academic Records", key: "academicRecords" },
        { name: "Attendance", key: "attendance" },
      ],
      id: 1,
    },
    {
      title: "Assessments & Grades",
      subOptions: [
        { name: "Assessments", key: "assessments" },
        { name: "Your Grades", key: "grades" },
        { name: "Remarks", key: "remarks" },
      ],
      id: 2,
    },
    {
      title: "Admissions",
      subOptions: [
        { name: "Online Application", key: "onlineApplication" },
        { name: "Admission Management", key: "admissionMgmt" },
        { name: "Fees Structure", key: "feesStructure" },
      ],
      id: 3,
    },
    {
      title: "Class & Schedules",
      subOptions: [
        { name: "Your Courses", key: "courses" },
        { name: "Class Schedules", key: "classSchedules" },
        { name: "Exam Schedules", key: "examSchedules" },
      ],
      id: 4,
    },
  ];
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="mt-4 flex h-16 w-full items-center justify-between px-2 md:px-8 lg:justify-around lg:gap-20 lg:px-0">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full">
        <Image
          src="/logo.png"
          alt="logo"
          height={90}
          width={90}
          className="bg-transparent object-contain"
        />
      </div>
      <div className="hidden items-center lg:flex lg:gap-8">
        {!isAdmin && pathname !== "/admin" ? (
          options.map((option) => (
            <Dropdown key={option.id}>
              <DropdownTrigger>
                <p className="cursor-pointer font-semibold hover:text-gray-700 dark:text-white dark:hover:text-gray-400">
                  {option.title}
                </p>
              </DropdownTrigger>
              <DropdownMenu aria-label={option.title}>
                {option.subOptions.map((subOption) => (
                  <DropdownItem key={subOption.key} href={`/${subOption.key}`}>
                    {subOption.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ))
        ) : (
          <></>
        )}
      </div>
      {pathname !== "/admin" && status !== "authenticated" ? (
        <Button
          variant="solid"
          color="primary"
          className="hidden lg:block"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      ) : (
        <Button
          variant="solid"
          color="primary"
          className="hidden lg:block"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      )}
      <div className="relative z-10 h-6 w-6 lg:hidden">
        {!openMenu ? (
          <RxHamburgerMenu
            className="h-6 w-6"
            onClick={() => {
              setOpenMenu((prev) => !prev);
            }}
          />
        ) : (
          <RxCross1
            className="h-6 w-6"
            onClick={() => {
              setOpenMenu((prev) => !prev);
            }}
          />
        )}
      </div>
      {openMenu && pathname !== "/admin" && (
        <div className="absolute right-0 top-0 h-screen w-52 bg-secondary px-4 shadow-sm shadow-gray-400 lg:hidden">
          {!isAdmin && (
            <div className="mt-32 flex flex-col justify-start gap-4">
              {/* <Dropdown backdrop="blur"> */}
              {options.map((option) => (
                <Dropdown key={option.id}>
                  <DropdownTrigger>
                    <p className="cursor-pointer font-semibold hover:text-gray-700 dark:text-white dark:hover:text-gray-400">
                      {option.title}
                    </p>
                  </DropdownTrigger>
                  <DropdownMenu aria-label={option.title}>
                    {option.subOptions.map((subOption) => (
                      <DropdownItem
                        key={subOption.key}
                        href={`/${subOption.key}`}
                      >
                        {subOption.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              ))}
              <Button
                variant="solid"
                color="primary"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
