import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      primaryLight: string;
      primaryDark: string;
      success: string;
      warning: string;
      error: string;
    };
    calcRem: (pxSize: number) => string;
    flexSet: (just?: string, align?: string) => string;
    flexColumnSet: (just?: string, align?: string) => string;
  }
}
