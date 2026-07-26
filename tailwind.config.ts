import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			'display': ['var(--font-display)', 'sans-serif'],
  			'inter': ['var(--font-inter)', 'sans-serif'],
  			'jetbrains': ['var(--font-jetbrains-mono)', 'monospace'],
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			/* ===== Espresso system =====
  			 * Fire (ember) against water (steam), grounded in dark roast.
  			 * Ember is for large text and UI only -- it does not clear contrast
  			 * at body sizes, so use cream/crema for running text. */
  			roast: '#0B0705',        // page base -- near-black but warm, never blue-black
  			portafilter: '#17100D',  // card / panel surface
  			grounds: '#2A1D18',      // hairlines, dividers
  			ember: {
  				DEFAULT: '#FF5F1F',    // fire -- primary accent
  				soft: '#FFA94D',
  				core: '#FFD9A0',
  			},
  			crema: '#E2B887',        // the signature tan
  			steam: '#9DB4C0',        // water -- cool counterweight
  			well: '#0E2A33',         // deep water glow
  			cream: {
  				DEFAULT: '#F5EDE4',    // primary text -- warm white, never pure #fff  (17.3:1 on roast)
  				muted: '#B8A99C',      // secondary text                              ( 8.8:1 on roast)
  				// Lightened from #7A6C62, which only reached 3.7:1 on the card
  				// surface -- this tone carries the small mono eyebrows and metadata,
  				// so it has to clear 4.5:1 rather than the large-text 3:1.
  				faint: '#8A7A6E',      // muted text                                  ( 4.9:1 on roast)
  			},

  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  		},
  		fontSize: {
  			/* Oversized display steps -- the premium register lives on huge type */
  			'display-sm': ['clamp(2.25rem, 6vw, 3.75rem)', {lineHeight: '0.95', letterSpacing: '-0.03em'}],
  			'display': ['clamp(2.75rem, 9vw, 7rem)', {lineHeight: '0.92', letterSpacing: '-0.04em'}],
  			'display-lg': ['clamp(3rem, 11vw, 9rem)', {lineHeight: '0.88', letterSpacing: '-0.045em'}],
  		},
  		keyframes: {
  			marquee: {
  				from: {transform: 'translateX(0)'},
  				to: {transform: 'translateX(-50%)'},
  			},
  			emberPulse: {
  				'0%, 100%': {opacity: '0.55'},
  				'50%': {opacity: '1'},
  			},
  		},
  		animation: {
  			marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
  			'ember-pulse': 'emberPulse 3.5s ease-in-out infinite',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
