import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        canvas: '#EEE9DF',
        ink: '#11110F',
        graphite: '#292923',
        quiet: '#8F8C85',
        signal: '#D86236',
      },
      borderColor: {
        // Hairlines: ink on warm sections, bone on dark sections.
        hairline: 'rgba(17, 17, 15, 0.14)',
        'hairline-strong': 'rgba(17, 17, 15, 0.28)',
        'hairline-inverse': 'rgba(238, 233, 223, 0.16)',
        'hairline-inverse-strong': 'rgba(238, 233, 223, 0.32)',
      },
      borderRadius: {
        // Square by default; `sm` is the only concession, for form controls.
        none: '0',
        sm: '2px',
      },
      maxWidth: {
        measure: '62ch',
        shell: '1440px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
