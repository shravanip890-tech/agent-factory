/** @type {import('tailwindcss').Config} */
// Colors point at the CSS variables in src/styles/_tokens.scss so utilities follow the active theme.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)', surface: 'var(--surface)', line: 'var(--border)',
        ink: 'var(--text)', muted: 'var(--text-2)', accent: 'var(--accent)',
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
