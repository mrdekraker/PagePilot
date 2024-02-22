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
        "gr-1": "#F5F8F2",
        "gr-2": "#EAF8F5",
        "gr-3": "#EDF1D6",
        "gr-4": "#D6E2C0",
        "gr-5": "#9DC08B",
        "gr-6": "#609966",
        "gr-7": "#40513B",
        "gr-8": "#2E3A2A",
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
