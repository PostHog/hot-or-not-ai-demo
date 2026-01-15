import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hot-red': '#cc0000',
        'hot-orange': '#ff6600',
        'hot-yellow': '#ffcc00',
        'retro-gray': '#cccccc',
        'retro-dark': '#333333',
        'retro-blue': '#0066cc',
      },
      fontFamily: {
        'arial': ['Arial', 'Helvetica', 'sans-serif'],
        'verdana': ['Verdana', 'Geneva', 'sans-serif'],
        'times': ['Times New Roman', 'Times', 'serif'],
      },
      boxShadow: {
        'retro': 'inset 1px 1px 0px #fff, inset -1px -1px 0px #808080, 2px 2px 0px #404040',
        'retro-inset': 'inset 1px 1px 0px #808080, inset -1px -1px 0px #fff',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

export default config;
