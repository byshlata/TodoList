import { createTheme } from '@material-ui/core';

export const themeDark = createTheme({
  palette: {
    primary: {
      main: 'rgba(105, 145, 60, 0.8)',
    },
    secondary: {
      main: 'rgba(15, 255, 255, 0.8)',
    },
    text: {
      secondary: 'white',
    },
  },
});

export const themeLight = createTheme({
  palette: {
    primary: {
      main: 'rgba(190, 50, 205, 1)',
    },
    secondary: {
      main: 'rgba(250, 250, 250, 1)',
    },
    background: {
      paper: 'rgba(129, 184, 235, 0.8)',
    },
  },
});
