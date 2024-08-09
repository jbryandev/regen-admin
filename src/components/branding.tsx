import Image from "next/image";

import icon from "@/public/ReGen_Icon_Primary.png";
import logo from "@/public/ReGen_Stacked_Full_Primary.svg";

export const Logo = () => {
  return <Image src={logo} alt="Regen logo" />;
};

export const Icon = () => {
  return <Image src={icon} alt="Regen logo" />;
};
