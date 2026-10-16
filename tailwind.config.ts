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
        // =====================================================================
        // BRIGHT, SUNLIT, ENERGETIC & AIRY DESIGN PALETTE
        // =====================================================================

        // 1. Radiant Coral Terracotta (Primary Accent & CTA - Bright, Punchy, Warm)
        terracotta: {
          DEFAULT: "#FF5738",
          hover: "#E64526",
          dark: "#CC381B",
          light: "#FFF0EB",
          50: "#FFF5F2",
          100: "#FFF0EB",
          200: "#FFD9CE",
          300: "#FFBBAA",
          400: "#FF8E75",
          500: "#FF5738", // Luminous Terracotta Coral
          600: "#E64526",
          700: "#CC381B",
          800: "#A32912",
          900: "#7A1C0A",
        },
        rose: {
          DEFAULT: "#FF5738",
          hover: "#E64526",
          dark: "#CC381B",
          light: "#FFF0EB",
          400: "#FF8E75",
          500: "#FF5738",
        },
        dustyrose: {
          DEFAULT: "#FF5738",
          hover: "#E64526",
          dark: "#CC381B",
          light: "#FFF0EB",
        },

        // 2. Sunny Marigold / Warm Gold (Playful Energy & Badges)
        amber: {
          DEFAULT: "#FFB703",
          50: "#FFFDF5",
          100: "#FFFBEB",
          200: "#FEF3C7",
          300: "#FDE68A",
          400: "#FBBF24",
          500: "#FFB703",
          600: "#D97706",
        },
        mustard: {
          DEFAULT: "#FFB703",
          50: "#FFFDF5",
          100: "#FFFBEB",
          500: "#FFB703",
        },

        // 3. Bright Leaf Emerald / Mint (Freshness & Security Deposit Safe)
        emerald: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
        forest: {
          DEFAULT: "#0F5143",
          dark: "#0A3B31",
          light: "#146958",
          50: "#F0FDF4",
          100: "#DCFCE7",
          500: "#0F5143",
        },

        // 4. Luminous Crisp White & Warm Peach Whites (Bright, Open, Airy Canvas)
        cream: {
          DEFAULT: "#FFFFFF",
          50: "#FFFFFF",
          100: "#FFFDFB",
          200: "#FFF9F5",
          300: "#FFF2EC",
          400: "#FFE6DB",
          500: "#EAD5C9",
        },

        // 5. Warm Sand & Peach (Soft Tints, Tags & Borders)
        sand: {
          DEFAULT: "#FFF2EC",
          hover: "#FFE6DB",
          dark: "#F4D2C3",
          light: "#FFF9F5",
          50: "#FFFDFB",
          100: "#FFF9F5",
          200: "#FFF2EC",
          300: "#FFE6DB",
          400: "#F4D2C3",
          500: "#E0BBAA",
        },
        warmsand: {
          DEFAULT: "#FFF2EC",
          hover: "#FFE6DB",
          dark: "#F4D2C3",
        },

        // 6. Deep Crisp Charcoal Ink (High-contrast, sharp typography on bright background)
        charcoal: {
          DEFAULT: "#1E2229",
          text: "#1E2229",
          dark: "#12151A",
          muted: "#64748B",
          border: "#E2E8F0",
          light: "#F8FAFC",
          50: "#FAFAFA",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#1E2229",
          950: "#12151A",
        },

        // Aliases for layout consistency:
        brand: {
          DEFAULT: "#FF5738",     // Radiant Terracotta Coral
          vermilion: "#FF5738",
          dark: "#E64526",
          light: "#FFF0EB",
        },
        ink: {
          950: "#1E2229",
          900: "#1E2229",
          800: "#2B323C",
          700: "#3E4754",
          600: "#64748B",
          500: "#94A3B8",
        },
        stone: {
          50: "#FFFFFF",          // Crisp Pure White
          100: "#FFF9F5",         // Soft Warm White
          200: "#FFEFE7",         // Soft Peach Border
          300: "#F0E4DC",
          400: "#D3C2B8",
          500: "#9C8A80",
          600: "#6B5A51",
          700: "#1E2229",
        },
        alabaster: {
          DEFAULT: "#FFF9F5",
          100: "#FFF9F5",
          200: "#FFEFE7",
        },
        greige: {
          DEFAULT: "#FFF9F5",
          100: "#FFF9F5",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "'SF Pro Display'",
          "'Neue Montreal'",
          "'Helvetica Neue'",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "SF Mono",
          "Menlo",
          "monospace",
        ],
        serif: [
          "'Cormorant Garamond'",
          "'Playfair Display'",
          "Georgia",
          "'Times New Roman'",
          "serif",
        ],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0",
        wide: "0.04em",
        wider: "0.08em",
        widest: "0.14em",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(30, 34, 41, 0.04), 0 1px 2px -1px rgba(30, 34, 41, 0.02)",
        flat: "0 0 0 1px rgba(30, 34, 41, 0.06)",
        card: "0 10px 30px -4px rgba(255, 87, 56, 0.08), 0 4px 12px -2px rgba(30, 34, 41, 0.03)",
        glow: "0 10px 25px -3px rgba(255, 87, 56, 0.35)",
        glass: "0 8px 32px 0 rgba(30, 34, 41, 0.06)",
      },
      borderRadius: {
        pill: "9999px",
        sharp: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
