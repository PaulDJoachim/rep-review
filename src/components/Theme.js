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
    fontFamily: 'Comic Sans MS'
  },
  shape: {
    borderRadius: 10
  },
  spacing: 5,
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: '#dad2bb'
      }
    }
  }
});

export default theme