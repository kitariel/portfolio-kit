import type {Config} from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-inter)', 'sans-serif'],
        jetbrains: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 7px)',
      },
      colors: {
        /* Midnight Intelligence palette — raw values, so the hex/rgba tokens in
           globals.css stay the single readable place to tune the theme. */
        background: {
          DEFAULT: 'var(--background)',
          deep: 'var(--background-deep)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          elevated: 'var(--surface-elevated)',
          glass: 'var(--surface-glass)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          muted: 'var(--foreground-muted)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--background-deep)',
          warm: 'var(--accent-warm)',
        },
        input: 'var(--border)',
        ring: 'var(--accent)',

        /* shadcn/ui channel tokens — kept in `H S% L%` form so opacity
           modifiers (bg-primary/90, border-muted/40) keep resolving. */
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'var(--foreground-muted)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
