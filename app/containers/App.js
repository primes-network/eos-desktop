// @flow
import * as React from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import styles from './App.css';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;

    const sideList = (
      <div>
        <List>
          {['History', 'Transfer', 'Delegate', 'Undelegate'].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {['RAM', 'Voting'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    const theme = createMuiTheme({
      palette: {
        type: 'dark'
      }
    });

    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.root}>
          <CssBaseline />
          <Drawer
            variant="permanent"
            className={styles.drawer}
            classes={{ paper: classNames(styles.drawer) }}
          >
            {sideList}
          </Drawer>
          <main className={styles.content}>
            <React.Fragment>{children}</React.Fragment>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}
