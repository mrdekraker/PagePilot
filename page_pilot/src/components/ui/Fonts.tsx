import { Libre_Baskerville, Montserrat } from "next/font/google";

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const mont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export { libre, mont };
