import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // OneYoto brand
        yoto: {
          amber: "#F6B300",
          gold: "#FFC933",
          red: "#F5312B",
          ember: "#FF5A3C",
        },
        // Healthcare complement
        vital: {
          teal: "#12C9C0",
          cyan: "#22D3EE",
          mint: "#5EEAD4",
        },
        deep: {
          900: "#0A0E1A",
          800: "#111726",
          700: "#1A2236",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        dash: {
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        pulseRing: "pulseRing 2.4s ease-out infinite",
        shimmer: "shimmer 8s ease infinite",
        dash: "dash 1.2s linear forwards",
      },
    },
  },
  plugins: [],
};

export default config;
