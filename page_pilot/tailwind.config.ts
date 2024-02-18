import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Mont: ["var(--font-mont)", "sans-serif"],
        Libre: ["var(--font-libre)", "serif"],
      },
      colors: {
        "gr-1": "#EDF1D6",
        "gr-2": "#9DC08B",
        "gr-3": "#609966",
        "gr-4": "#40513B",
      },
    },
    backgroundImage: (theme) => ({
      "gradient-gradual":
        "linear-gradient(180deg, rgba(116, 116, 116, 0) 66.15%, #000000 100%)",
    }),
  },
  screens: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1060px",
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
