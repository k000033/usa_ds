module.exports = {
  content: ['./src/**/*.{html,vue}'],
  prefix: 'tw-',
  theme: {
    extend: {
      animation: {
        icon1: 'icon1 0.8s linear infinite',
        icon2: 'icon2 1s linear infinite'
      },
      keyframes: {
        icon1: {
          '0%': { transform: 'translateX(0) rotate(90deg)' },
          '100%': { transform: 'translateX(5px) rotate(90deg)' }
        },
        icon2: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-5px)' }
        }
      }
    }
  },
  plugins: []
};
