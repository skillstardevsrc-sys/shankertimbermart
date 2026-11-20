import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          primary: "#3F2E2F", // Primary Dark
          walnut: "#6E5053",  // Secondary Walnut
          muted: "#9F7E82",   // Muted Rose
          dusty: "#CDAFB0",   // Dusty Blush
          pale: "#EAD7CF",    // Pale Blush
          ivory: "#FAF1E8",   // Warm Ivory
        },
        walnut: {
          DEFAULT: "#3F2E2F",
          50: "#FAF1E8",
          100: "#EAD7CF",
          200: "#CDAFB0",
          300: "#9F7E82",
          400: "#806064",
          500: "#6E5053",
          600: "#5A4042",
          700: "#4D3638",
          800: "#3F2E2F",
          900: "#2A1E1F",
          950: "#1A1213",
        },
        timber: {
          DEFAULT: "#9F7E82",
          50: "#FDFBF9",
          100: "#FAF1E8",
          200: "#EAD7CF",
          300: "#CDAFB0",
          400: "#B8969A",
          500: "#9F7E82",
          600: "#8B6B6F",
          700: "#6E5053",
          800: "#543C3E",
          900: "#3F2E2F",
        },
        sand: {
          DEFAULT: "#CDAFB0",
          50: "#FAF7F5",
          100: "#FAF1E8",
          200: "#EAD7CF",
          300: "#DBC0BE",
          400: "#CDAFB0",
          500: "#B69496",
          600: "#9F7E82",
          700: "#826366",
          800: "#654B4E",
          900: "#3F2E2F",
        },
        ivory: {
          DEFAULT: "#FAF1E8",
          50: "#FFFDFB",
          100: "#FAF1E8",
          200: "#F5ECE2",
          300: "#EAD7CF",
          400: "#DFC5BB",
          500: "#CDAFB0",
        },
        olive: {
          DEFAULT: "#5C6650",
          50: "#F4F6F2",
          100: "#E6EAE2",
          200: "#CCD5C5",
          300: "#B0BFA5",
          400: "#8B9E7C",
          500: "#5C6650",
          600: "#4B5441",
          700: "#3B4233",
          800: "#2B3025",
          900: "#1A1D16",
        },
        charcoal: {
          DEFAULT: "#241D1A",
          light: "#3E332E",
          muted: "#6A5C55",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'DM Sans'", "'Manrope'", "system-ui", "sans-serif"],
        manrope: ["'Manrope'", "'DM Sans'", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1160px",
      },
      borderRadius: {
        button: "12px",
        card: "20px",
        container: "28px",
        pill: "9999px",
        form: "12px",
      },
      boxShadow: {
        luxury: "0 14px 34px -10px rgba(43, 29, 21, 0.10), 0 6px 12px -2px rgba(43, 29, 21, 0.05)",
        card: "0 6px 24px -4px rgba(43, 29, 21, 0.07)",
        hover: "0 20px 40px -8px rgba(43, 29, 21, 0.16)",
        glow: "0 0 25px rgba(200, 138, 62, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
