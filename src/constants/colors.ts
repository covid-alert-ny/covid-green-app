const teal = '#3A7B7F';
const warning = '#DC0000';
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
  yellow: '#FFDA1A', // review - only in unused <Progress>
  softPurple: `${purple}1E`, // translucent, same as outer bubble icon SVG
  orange: '#FF8248',
  lightOrange: '#FFC0A3',
  white,
  teal,
  gray: '#F5F5F5', // review - only input
  darkGray: '#96989B', // review - only input,
  darkestGray: '#5F5F5F',
  dot: '#D8D8D8',
  selectedDot: '#2E2E2E',
  success: '#00CF68', // only 1 usage?
  text: '#2E2E2E',
  warningText: '#4b0600',
  warning,
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
      background: warning,
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
} as const;
