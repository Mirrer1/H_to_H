import { Theme } from '@emotion/react';

const theme: Theme = {
  colors: {
    primary: '#b99976',
    primaryLight: '#d2b48c',
    primaryDark: '#987554',
    success: '#a5d6a7',
    warning: '#fff9c4',
    error: '#c62828',
  },
  calcRem: pxSize => {
    return `${pxSize / 16}rem`;
  },
  flexSet: (just = 'center', align = 'center') => {
    return `display: flex;
    justify-content: ${just};
    align-items: ${align};`;
  },
  flexColumnSet: (just = 'center', align = 'center') => {
    return `display: flex;
    flex-direction: column;
    justify-content: ${just};
    align-items: ${align};`;
  },
};

export default theme;
