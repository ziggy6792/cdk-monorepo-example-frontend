import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = '#2a6db0';
const arcGrey = '#868686';
const swtRed = '#b02a2a';

const defaultTheme = createMuiTheme();
export default createMuiTheme({
  palette: {
    primary: {
      main: arcBlue,
    },
    secondary: {
      main: swtRed,
    },
    error: {
      main: swtRed,
    },
  },
  typography: {
    h2: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: arcBlue,
    },
    h3: {
      fontSize: '1.75rem',
      fontFamily: 'Raleway',
      color: arcBlue,
      fontWeight: 700,
    },
    h4: {
      fontSize: '1rem',
      fontFamily: 'Raleway',
      color: arcBlue,
      fontWeight: 700,
    },
    h5: {
      fontSize: '0.8rem',
      fontFamily: 'Raleway',
      color: arcBlue,
      fontWeight: 700,
    },
    subtitle1: {
      color: arcGrey,
      fontSize: '1.25rem',
      fontWeight: 300,
    },
    subtitle2: {
      color: arcGrey,
      fontSize: '1.25rem',
      fontWeight: 200,
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: '1rem',
      },
    },
    body1: {
      fontSize: '1.25rem',
      color: arcGrey,
      fontWeight: 300,
    },
    body2: {
      fontSize: '1.25rem',
      color: 'white',
      fontWeight: 300,
    },
    caption: {
      fontSize: '1rem',
      fontWeight: 300,
      color: arcGrey,
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: arcBlue,
        fontSize: '1rem',
      },
    },
    MuiInput: {
      root: {
        color: arcGrey,
        fontWeight: 300,
      },
      underline: {
        '&:before': {
          borderBottom: `2px solid ${arcBlue}`,
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid ${arcBlue}`,
        },
      },
    },
    MuiFormHelperText: {
      root: {
        color: swtRed,
        fontSize: '0.7rem',
      },
    },

    // Data table
    MuiTableCell: {
      root: {
        [defaultTheme.breakpoints.down('xs')]: {
          fontSize: '0.8rem',
          paddingTop: '0.6em',
          paddingBottom: '0.6em',
        },
      },
    },

    MuiTablePagination: {
      actions: {
        '& button': {
          [defaultTheme.breakpoints.down('xs')]: {
            padding: '0.4em',
          },
        },
      },
      caption: {
        [defaultTheme.breakpoints.down('xs')]: {
          fontSize: '0.9rem',
        },
      },
      toolbar: {
        minHeight: '2.5em',
      },
    },

    MuiTableBody: {
      root: {
        '&:nth-child(1)': {
          backgroundColor: '#FF0000',
        },
      },
    },
  },
});
