// @flow
import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

type Props = {
  children: React.Node
};

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <React.Fragment>{children}</React.Fragment>
      </MuiThemeProvider>
    );
  }
}
