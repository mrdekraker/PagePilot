import React from "react";
import { BookOpenIcon } from '@heroicons/react/24/solid'
import { Libre_Baskerville } from 'next/font/google'
import  Link from 'next/link'

const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: '400'
})

type Props = {};

const Navbar = (props: Props) => {

  return (
    <header className="border">
      <nav className="flex justify-between items-center w-full bg-wh-900 text-wh-10 px-10 py-4">
        <h1 className={`${libre.className} text-4xl font-bold font-custom1`}>
          <Link href="/">
          <BookOpenIcon className="inline-block w-10 h-10 mr-1" />
            PagePilot
          </Link>
        </h1>
        <ul className="flex flex-row space-x-2 text-lg">
          <li>
            <Link href="/discover">
              Discover
            </Link>
          </li>
          <li>
            <Link href="/understand">
              Understand
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
};

export default Navbar;
