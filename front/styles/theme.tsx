import { Theme } from '@emotion/react';

const theme: Theme = {
  size: {
    tablet: '640px',
    laptop: '1200px',
    desktop: '1800px',
  },
  colors: {
    red: '#f26462',
    primaryGray: '#3f4150',
    border: '#EFEFEF',
    selected: '#f2f2f2',
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
