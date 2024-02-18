"use client";

import React from "react";
import { Icons } from "@/components/Icons";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex border justify-between w-full px-8">
      <div className="">
        <Icons.Logo className="text-black h-12" />
      </div>
      <div>PagePilot && Logo</div>
      <div>Discover</div>
    </div>
  );
};

export default Navbar;
