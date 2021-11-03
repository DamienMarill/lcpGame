const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const componentColors = [
  'rose',
  'pink',
  'fuchsia',
  'purple',
  'violet',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'emerald',
  'green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'red',
  'warmGray',
  'trueGray',
  'gray',
  'coolGray',
  'blueGray',
];

function genBtn(theme, colors){
  let buttons = {
    '.btn': {
      padding: `${theme('spacing.1')} ${theme('spacing.3')}`,
      borderRadius: theme('borderRadius.md'),
      transition: 'all 300ms ease-in-out',
      fontSize: theme('spacing.4'),
      '&:focus': {
        outline: '2px solid transparent',
      },
      '&:focus-within': {
        outline: '2px solid transparent',
      },
      '&:active': {
        outline: '2px solid transparent',
      },
      '&:target': {
        outline: '2px solid transparent',
      }
    }
  }

  for (var i=0; i<colors.length; i++){
    buttons['.btn-'+colors[i]] = {
      backgroundColor: theme('colors.'+colors[i]+'.700'),
      color: theme('colors.white'),
      '&:hover':{
        backgroundColor: theme('colors.'+colors[i]+'.800'),
      },
      '&:focus':{
        boxShadow: 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) '+theme('colors.'+colors[i]+'.200'),
      },
      '&:disabled':{
        opacity: '0.5',
      }
    }

    buttons['.btn-outline-'+colors[i]] = {
      backgroundColor: theme('colors.transparent'),
      color: theme('colors.'+colors[i]+'.500'),
      border: 'solid '+theme('colors.'+colors[i]+'.500'),
      '&:hover':{
        backgroundColor: theme('colors.'+colors[i]+'.500'),
        color: theme('colors.white'),
      },
      '&:focus':{
        boxShadow: 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) '+theme('colors.'+colors[i]+'.200'),
      },
      '&:disabled':{
        opacity: '0.5',
      }
    }

    buttons['.btn-gradient-'+colors[i]] = {
      background: 'linear-gradient(55deg, '+theme('colors.'+colors[i]+'.400')+', '+theme('colors.'+colors[i]+'.600')+')',
      color: theme('colors.white'),
      '&:hover':{
        background: 'linear-gradient(55deg, '+theme('colors.'+colors[i]+'.500')+', '+theme('colors.'+colors[i]+'.700')+')',
      },
      '&:focus':{
        boxShadow: 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) '+theme('colors.'+colors[i]+'.200'),
      },
      '&:disabled':{
        opacity: '0.5',
      }
    }
  }

  return buttons;
}

module.exports = {
  prefix: '',
  purge: {
    enabled: false,
    content: [
      './src/**/*.{html,ts}',
    ],
    options: {
      safelist: []
    }
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black : colors.black,
      white : colors.white,
      rose : colors.rose,
      pink : colors.pink,
      fuchsia : colors.fuchsia,
      purple : colors.purple,
      violet : colors.violet,
      indigo : colors.indigo,
      blue : colors.blue,
      lightBlue : colors.lightBlue,
      cyan : colors.cyan,
      teal : colors.teal,
      emerald : colors.emerald,
      green : colors.green,
      lime : colors.lime,
      yellow : colors.yellow,
      amber : colors.amber,
      orange : colors.orange,
      red : colors.red,
      warmGray : colors.warmGray,
      trueGray : colors.trueGray,
      gray : colors.gray,
      coolGray : colors.coolGray,
      blueGray : colors.blueGray,
      base: {
        blue : colors.blue["500"],
        red : colors.red["500"],
        green : colors.green["500"],
        black : colors.black,
        white : colors.white,
        pink : colors.pink["500"],
        purple : colors.purple["500"],
        cyan : colors.cyan["500"],
        teal : colors.teal["500"],
        yellow : colors.yellow["500"],
        orange : colors.orange["500"],
        gray: colors.coolGray["500"],
        mb: marillColor.blue["900"],
        mg: marillColor.gold["500"]
      },
      crea: {
        dev: colors.violet,
        design: colors.fuchsia,
        infographie: colors.rose,
        video: colors.orange,
        ddd: colors.emerald,
      },
      cat: {
        primary: colors.lightBlue,
        secondary: colors.blue,
        success: colors.green,
        danger: colors.red,
        warning: colors.amber,
        infos: colors.cyan,
      }
    },
    extend: {
      backgroundImage: (theme) => ({
        check: "url('/assets/icon/check.svg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
    },
  },
  plugins: [
    plugin(function ({addComponents, theme}) {
      addComponents(genBtn(theme, componentColors));
    })
  ],
  future: {
    purgeLayersByDefault: true,
  },
};
