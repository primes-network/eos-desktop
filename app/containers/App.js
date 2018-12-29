// @flow
import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router';
import { rootRoutes } from '../constants/routes';

type Props = {};

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    useNextVariants: true
  }
});

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route
            path={rootRoutes.COUNTER.path}
            component={rootRoutes.COUNTER.component}
          />
          <Route
            path={rootRoutes.ACCOUNT.path}
            component={rootRoutes.ACCOUNT.component}
          />
          <Route
            path={rootRoutes.HOME.path}
            component={rootRoutes.HOME.component}
          />
        </Switch>
      </MuiThemeProvider>
    );
  }
}
