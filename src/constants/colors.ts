const teal = '#3A7B7F';
const red = '#B4083A';
const white = '#FFFFFF';
const disabled = '#B2B2B2';

const purple = '#523178';
const background = '#f3f3f8';
const info = '#f2a900';
const blue = '#0012ff';

const borderInfo = '#cb8e00';

export const colors = {
  black: '#000000',
  blank: white,
  disabled,
  purple,
  background,
  blue,
  icons: {
    gray: '#b2b2b2'
  },
  tabs: {
    highlighted: '#e7e8f2',
    alertsHighlighted: '#ffefef'
  },
  info: {
    primary: info,
    border: borderInfo,
    main: '#eeebeb'
  },
  empty: {
    border: '#eeeeee'
  },
  yellow: '#FFEA0C', // review & remove,
  lightpurple: '#fff37a',
  mildpurple: '#fff16f',
  darkerpurple: '#FFDA1A', // review & merge to purple
  orange: '#FF8248',
  lightOrange: '#FFC0A3',
  white,
  red,
  teal,
  gray: '#F5F5F5', // review - only input
  darkGray: '#96989B', // review - only input,
  darkestGray: '#5F5F5F',
  dot: '#D8D8D8',
  selectedDot: '#2E2E2E',
  success: '#00CF68', // only 1 usage?
  text: '#2E2E2E',
  warningText: '#4b0600',
  warning: '#DC0000',
  buttons: {
    default: {
      text: white,
      background: purple,
      shadow: '#392253'
    },
    secondary: {
      text: purple,
      background: white,
      shadow: '#D8D8D8'
    },
    danger: {
      text: white,
      background: red,
      shadow: '#8B042A'
    },
    empty: {
      text: purple,
      background: white,
      shadow: '#D3D0D0'
    },
    link: {
      text: purple,
      background: background,
      shadow: 'transparent'
    }
  }
};
