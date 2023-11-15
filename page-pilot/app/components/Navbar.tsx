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
        <h1 className={`${libre.className} font-bold text-4xl hidden sm:block`}>
          <Link href="/">PagePilot</Link>
        </h1>
        <div>
          <Link href="/">
            <BookOpenIcon className="inline-block w-14 h-14 mr-1" />
          </Link>
        </div>
        <ul className="flex flex-row space-x-2 text-xl">
          <li className="hover:text-ocean-blue">
            <Link href="/discover">Discover</Link>
          </li>
          <li className="hover:text-ocean-blue">
            <Link href="/understand">Understand</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
