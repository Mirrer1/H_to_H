import { Theme } from '@emotion/react';

const theme: Theme = {
  colors: {
    primary: '#8d6e63',
    primaryLight: '#d3b8ae',
    primaryDark: '#5f4339',
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
