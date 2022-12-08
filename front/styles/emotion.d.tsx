import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    size: {
      tablet: string;
      laptop: string;
      desktop: string;
    };
    colors: {
      red: string;
      primaryGray: string;
      border: string;
      selected: string;
    };
    calcRem: (pxSize: number) => string;
    flexSet: () => string;
    flexColumnSet: () => string;
  }
}
