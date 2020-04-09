import React, { Component } from 'react';
// Material-UI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
// our App
import App from './App';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nightMode: false
    };
  }

  createTheme() {
    const { nightMode } = this.state;
    return createMuiTheme({
      palette: {
        type: nightMode ? 'dark' : 'light'
      },
      typography: {
        useNextVariants: true
      }
    });
  }

  updateTheme = mode => {
    this.setState({
      nightMode: mode
    });
  };

  render() {
    return (
      <MuiThemeProvider theme={this.createTheme()}>
        <CssBaseline />
        <App {...this.props} updateTheme={this.updateTheme} nightMode={this.state.nightMode} />
      </MuiThemeProvider>
    );
  }
}
