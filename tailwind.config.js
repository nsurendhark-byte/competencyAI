/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#020617',
        surfaceDark: '#05091A',
        cardDark: '#11182B',
        inputDark: '#050A19',
        borderDark: '#26314A',
        purplePrimary: '#5B3DF5',
        purpleBright: '#633BFF',
        blueAccent: '#3B82F6',
        cyanAccent: '#22D3EE',
        tealAccent: '#20D9C2',
        textMain: '#F8FAFC',
        textSecondary: '#94A3B8',
        textMuted: '#64748B',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', '-apple-system', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
