import { createMuiTheme } from '@material-ui/core/styles'

const _compatibilityTheme = {
  props: {
    MuiTabs: {
      scrollable: true,
      scrollButtons: 'off'
    }
  },
  overrides: {
    MuiTabs: {
      root: {
        maxWidth: 'calc(100vw - 269px)'
      }
    }
  },
  palette: {
    secondary: {
      light: '#5f5fc4',
      main: '#283593',
      dark: '#001064',
      contrastText: '#fff'
    }
  }
}

const _darkTheme = {
  ..._compatibilityTheme,
  palette: {
    type: 'dark' // Switching the dark mode on is a single property value change.
  },
  overrides: {
    MuiTabs: {
      root: {
        ..._compatibilityTheme.overrides.MuiTabs.root,
        color: 'white'
      }
    }
  }
}

export const defaultTheme = createMuiTheme(_compatibilityTheme)

export const darkTheme = createMuiTheme(_darkTheme)
