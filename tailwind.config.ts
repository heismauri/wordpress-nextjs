import type { Config } from 'tailwindcss';

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
  }
};

export default config;
