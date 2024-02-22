"use client";

import { FC, ReactNode } from "react";
import { Icons } from "@/components/Icons";
import Link from "next/link";
import { libre, mont } from "@/components/ui/Fonts";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gr-1">
      <nav className="fixed top-0 left-0 right-0 w-full bg-white px-12 py-2 flex items-center justify-between shadow-md">
        <Link
          href="/"
          className="flex h-16 shrink-0 items-center w-12 text-gr-6">
          <Icons.Logo className=" text-gr-6" />
        </Link>
        <Link
          href="/"
          className="flex h-16 shrink-0 items-center w-12 text-gray-500">
          <Icons.PagePilotLogo className="w-12" />
        </Link>
        <Link
          style={libre.style}
          href="/discover"
          className="flex border rounded-lg bg-gr-6 hover:bg-gr-8 border-gr-1 p-2 shrink-0 items-center text-gr-1 focus:outline-none">
          Discover More
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default layout;
