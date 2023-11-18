"use client";

import React from "react";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { Libre_Baskerville } from "next/font/google";
import Link from "next/link";

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
});

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="mb-5">
      <nav className="flex justify-between items-center w-full bg-wh-900 text-wh-10 px-10 py-4">
        {/* Use Link component for navigation to the home page */}
        <Link
          href="/"
          className={`${libre.className} font-bold text-4xl hidden sm:block`}>
          PagePilot
        </Link>

        <div>
          {/* Use Link component for navigation to the home page */}
          <Link href="/">
            <BookOpenIcon className="inline-block w-14 h-14 mr-1" />
          </Link>
        </div>

        <ul className="flex flex-row space-x-2 text-xl">
          {/* Use Link component for navigation to the discover page */}
          <li className="hover:text-ocean-blue">
            <Link href="/discover">Discover</Link>
          </li>

          {/* Use Link component for navigation to the understand page */}
          <li className="hover:text-ocean-blue">
            <Link href="/understand">Understand</Link>
          </li>

          {/* Uncomment and use Link component for navigation to the login page */}
          {/* <li className="hover:text-ocean-blue">
            <Link href="/login">Log In</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
