const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    options: {
      safelist: [
        /^shadow/,
        /^bg/,
        /^text/,
        /^border/,
        /^from/,
        /^to/,
        /^dark:/,
        /^hover:/,
        'dark',
        /^dark:/,
        /^mr/,
        /^w/
      ]
    }
  },
  darkMode: 'class', // false or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ['Poppins', 'sans-serif'],
      display: ['Poppins', 'sans-serif']
    },
    boxShadow: {
      sm: '0 2px 4px 0 rgba(0,0,0,0.05)',
      DEFAULT:
        '0px 4px 6px -1px rgba(0, 0, 0, 0.05), 0px 2px 4px -1px rgba(0, 0, 0, 0.05)',
      lg: '0 2px 4px 0 rgba(0,0,0,0.03), 0 10px 40px 0 rgba(0,0,0,0.05)',
      xl: '0 2px 4px 0 rgba(0,0,0,0.05), 0 0px 40px 0 rgba(0,0,0,0.1)',
      '2xl': '0px 25px 50px -12px rgba(0, 0, 0, 0.1)',
      '3xl':
        '0px 10px 10px -5px rgba(0, 0, 0, 0.02), 0px 20px 25px -5px rgba(0, 0, 0, 0.03)',
      '4xl': '25px 25px 50px -12px rgba(0, 0, 0, 0.03)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      none: 'none'
    },
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.primary-bright', 'currentColor'),
      transparent: 'none'
    }),
    screens: {
      xs: '440px',
      ...defaultTheme.screens
    },
    extend: {
      height: {
        '112': '28rem'
      },
      borderRadius: {
        '2xl': '1.25rem'
      },
      colors: {
        primary: '#4D4040',
        'primary-bright': '#FAFAFA',
        gray: 'rgba(77, 64, 64, 0.5)',
        'gray-dark': 'rgba(250, 250, 250, 0.5)',
        white1: '#FDFBF5',
        'white1-dark': '#0B0B0B',
        white2: '#F9F4E7',
        'white2-dark': '#212121',
        white3: '#F1EADA',
        'white3-dark': '#383838',
        white4: '#EADFC7',
        'white4-dark': '#424242',
        'white4-dark-greyed': 'rgba(66, 66, 66, 0.5)',
        'ape-yellow': '#FFB300',
        'hovered-ape-yellow': '#FFDA00',
        success: '#38A611',
        'hovered-success': '#38A611B3',
        error: '#DF4141',
        'hovered-error': '#DF4141B3',
        blue: {
          50: '#6a7cff',
          100: '#6072ff',
          200: '#5668ff',
          300: '#4c5eff',
          400: '#4254ff',
          500: '#384aff',
          600: '#2e40f5',
          700: '#2436eb',
          800: '#1a2ce1',
          900: '#1022d7'
        },
        pink: {
          50: '#ff4dff',
          100: '#ff43ff',
          200: '#ff39ff',
          300: '#ff2fff',
          400: '#fc25ff',
          500: '#f21bf6',
          600: '#e811ec',
          700: '#de07e2',
          800: '#d400d8',
          900: '#ca00ce'
        },
        yellow: {
          50: '#FFFBEA',
          100: '#FFF6D5',
          200: '#FFEEAD',
          300: '#FEE684',
          400: '#FEDD5C',
          500: '#FED533',
          600: '#F8C601',
          700: '#C09901',
          800: '#886D01',
          900: '#504000'
        },
        orange: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        }
      }
    }
  },
  variants: {
    extend: {
      margin: ['first'],
      borderRadius: ['first', 'last'],
      zIndex: ['hover'],
      borderWidth: ['dark', 'last']
    }
  },
  plugins: []
};
