/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#C9856A',       // Dusty Rose - primary CTA, links
        'accent-dark': '#A96D55', // Darker hover state
        cream: '#FAF8F5',        // Warm off-white background
        charcoal: '#1A1A1A',     // Deep text / black replacement
        'charcoal-light': '#3D3D3D',
        blush: '#F5DDD5',        // Softer blush for backgrounds
        stone: '#8C7B72',        // Warm grey for secondary text
      },
      fontFamily: {
        sans: ['Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        mono: ['ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        'ultra': '0.25em',
        'mega': '0.35em',
      },
      animation: {
        'ken-burns': 'kenBurns 60s ease-out infinite alternate',
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-down': 'slideDown 0.4s ease forwards',
        'slide-up': 'slideUp 0.3s ease forwards',
        'marquee': 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 50s linear infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'scale-in': 'scaleIn 0.5s ease forwards',
        'stagger-1': 'fadeInUp 0.7s ease 0.1s forwards',
        'stagger-2': 'fadeInUp 0.7s ease 0.25s forwards',
        'stagger-3': 'fadeInUp 0.7s ease 0.4s forwards',
        'stagger-4': 'fadeInUp 0.7s ease 0.55s forwards',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'editorial': '0 8px 40px rgba(0,0,0,0.08)',
        'card': '0 2px 20px rgba(0,0,0,0.06)',
        'hover': '0 12px 40px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
