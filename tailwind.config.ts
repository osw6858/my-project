import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      height: {
        main: 'calc(100vh - 113px)',
      },
      maxHeight: {
        main: 'calc(100vh - 113px)',
      },
      minHeight: {
        main: 'calc(100vh - 113px)',
      },
    },
  },
  plugins: [],
} satisfies Config
