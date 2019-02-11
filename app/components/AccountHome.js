// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import HistoryIcon from '@material-ui/icons/History';
import SendIcon from '@material-ui/icons/Send';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MemoryIcon from '@material-ui/icons/Memory';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import { rootRoutes, accountRoutes } from '../constants/routes';

type Props = {
  classes: object,
  match: object,
  history: object,
  location: object,
  resetAccountInfo: () => void,
  resetAccountToken: () => void,
  resetAccountActions: () => void
};

const drawerWidth = 190;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  }
});

class AccountHome extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  state = {
    selectedIndex: 'history'
  };

  handleListItemSelected(selectedIndex) {
    const {
      history,
      location,
      match: { params }
    } = this.props;
    const newPath = `/account/${params.name}/${selectedIndex}`;
    if (newPath === location.pathname) {
      return;
    }
    history.push(newPath);
    this.setState({ selectedIndex });
  }

  handleLogout() {
    const {
      resetAccountInfo,
      resetAccountToken,
      resetAccountActions
    } = this.props;
    resetAccountInfo();
    resetAccountToken();
    resetAccountActions();
  }

  render() {
    const { classes } = this.props;

    const { selectedIndex } = this.state;

    const sideList = (
      <div>
        <List>
          <ListItem
            button
            key="history"
            selected={selectedIndex === 'history'}
            onClick={() => this.handleListItemSelected('history')}
          >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
          <ListItem
            button
            key="token"
            selected={selectedIndex === 'token'}
            onClick={() => this.handleListItemSelected('token')}
          >
            <ListItemIcon>
              <EuroSymbolIcon />
            </ListItemIcon>
            <ListItemText primary="Token" />
          </ListItem>
          <ListItem
            button
            key="transfer"
            selected={selectedIndex === 'transfer'}
            onClick={() => this.handleListItemSelected('transfer')}
            disabled
          >
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Transfer" />
          </ListItem>
          <ListItem
            button
            key="delegate"
            selected={selectedIndex === 'delegate'}
            disabled
          >
            <ListItemIcon>
              <ArrowForwardIosIcon />
            </ListItemIcon>
            <ListItemText primary="Delegate" />
          </ListItem>
          <ListItem
            button
            key="undelegate"
            selected={selectedIndex === 'undelegate'}
            disabled
          >
            <ListItemIcon>
              <ArrowBackIosIcon />
            </ListItemIcon>
            <ListItemText primary="Undelegate" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            key="ram"
            selected={selectedIndex === 'ram'}
            disabled
          >
            <ListItemIcon>
              <MemoryIcon />
            </ListItemIcon>
            <ListItemText primary="RAM" />
          </ListItem>
          <ListItem
            button
            key="voting"
            selected={selectedIndex === 'voting'}
            disabled
          >
            <ListItemIcon>
              <HowToVoteIcon />
            </ListItemIcon>
            <ListItemText primary="Voting" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            component={Link}
            to={rootRoutes.HOME.path}
            key="logout"
            onClick={this.handleLogout}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{ paper: classNames(classes.drawerPaper) }}
        >
          {sideList}
        </Drawer>
        <main className={classes.content}>
          <Switch>
            <Route
              path={accountRoutes.HISTORY.path}
              component={accountRoutes.HISTORY.component}
            />
            <Route
              path={accountRoutes.TOKEN.path}
              component={accountRoutes.TOKEN.component}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(AccountHome);
