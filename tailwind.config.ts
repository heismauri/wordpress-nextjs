import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/utils/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)']
      }
    }
  },
  plugins: [typography]
};

export default config;
