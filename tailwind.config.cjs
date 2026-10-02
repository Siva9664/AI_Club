// tailwind.config.cjs
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{tsx,ts,jsx,js}', './index.html'],
  theme: {
    extend: {
      // Colors use CSS variables defined in tokens.css
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-bg)',
        foreground: 'var(--color-fg)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
      spacing: {
        DEFAULT: 'var(--spacing)',
      },
    },
  },
  plugins: [],
};
