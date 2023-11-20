import React from "react";

import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  return (
    <footer className="bg-wh-900 text-wh-50 py-2 px-10">
      <div className="justify-between mx-auto gap-16 sm:flex">
        {/* FIRST COLUMN */}
        <div className="mt-16 basis-1/2 sm:mt-0">
          <h4 className="font-bold">
            <BookOpenIcon className="inline-block w-8 h-8 mr-1" />
            PagePilot
          </h4>
          <p className="my-5">
            PagePilot: Your literary co-pilot! Discover books you'll love, and
            unravel text passages effortlessly with the use of ChatGPT's
            insightful analysis.
          </p>
          <p>© Mark DeKraker - All Rights Reserved</p>
        </div>
        {/* SECOND COLUMN */}
        <div className="mt-16 basis-1/4 sm:mt-0">
          <h4 className="font-bold">Links</h4>
          <p className="my-5 hover:text-ocean-blue">
            <Link href="http://mrdekraker.com">mrdekraker.com</Link>
          </p>
          <p className="my-5 hover:text-ocean-blue">
            <Link href="https://www.linkedin.com/in/mdek/">LinkedIn</Link>
          </p>
          <p className=" hover:text-ocean-blue">
            <Link href="https://www.github.com/mrdekraker">GitHub</Link>
          </p>
        </div>
        {/* THIRD COLUMN */}
        <div className="mt-16 basis-1/4 sm:mt-0">
          <h4 className="font-bold">Contact Me</h4>
          <p className="my-5">Nosce Te Ipsum</p>
          <p>mrdekraker@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
