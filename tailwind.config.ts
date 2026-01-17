import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          secondary: "hsl(var(--sidebar-foreground-secondary))",
          border: "hsl(var(--sidebar-border))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        },
        dashboard: {
          DEFAULT: "hsl(var(--dashboard-background))",
          foreground: "hsl(var(--dashboard-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        // Headlines
        h1: ['48px', { lineHeight: '58px', fontWeight: '600' }],
        h2: ['40px', { lineHeight: '48px', fontWeight: '600' }],
        h3: ['32px', { lineHeight: '38px', fontWeight: '600' }],
        h4: ['28px', { lineHeight: '34px', fontWeight: '600' }],
        h5: ['24px', { lineHeight: '28px', fontWeight: '600' }],
        // Subtitles
        s1: ['18px', { lineHeight: '28px', fontWeight: '600' }],
        s2: ['16px', { lineHeight: '24px', fontWeight: '600' }],
        // Body
        b1: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        b2: ['16px', { lineHeight: '24px', fontWeight: '500' }],
        b3: ['14px', { lineHeight: '20px', fontWeight: '400' }],
        b4: ['14px', { lineHeight: '20px', fontWeight: '500' }],
        // Captions
        c1: ['12px', { lineHeight: '16px', fontWeight: '400' }],
        c2: ['12px', { lineHeight: '16px', fontWeight: '500' }],
        c3: ['10px', { lineHeight: '14px', fontWeight: '500' }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
