import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F00'
    },
    secondary: {
      main: '#0F0'
    },
    background: {
      default: "#f9f2d6"
    }
  },
  typography: {
    fontFamily: 'Oswald'
  },
  shape: {
    borderRadius: 10
  },
  spacing: 5,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#dad2bb',
      }
    },
    MuiToolbar: {
      root: {
        backgroundColor: '#dad2bb'
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: '#fbf8f1',

      },
    },
    MuiButton: {
      root: {
        backgroundColor: '#fbf8f1',
        width: 180
      },
      contained: {
        backgroundColor: '#fbf8f1',
      },
      label: {
        color: '#60563a',
      },
    },
    MuiTypography: {
      root: {
        color: '#60563a',
      },
      h3: {
        fontFamily: 'Cinzel Decorative',
        fontWeight: 900,
        color: '#1c3f73',
      },
      body1: {
        fontFamily: 'Oxygen',
        padding: 10
      },
      body2: {
        fontFamily: 'Oxygen'
      },
    },
    MuiListItem: {
      button: {
        border: '1px solid #60563a',
        borderRadius: 10,
        backgroundColor: '#fbf8f1',
        "&:hover": {
          backgroundColor: "#f9f2d6dd !important"
        }
      }
    },
    MuiGrid: {
      root: {
        textAlign: 'center',
        margin: 'auto',
        padding: '5px'
      }
    }
  }
});

export default theme