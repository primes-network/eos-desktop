// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountInfoContainer from './AccountInfoContainer';
import AccountActionsContainer from './AccountActionsContainer';
import routes from '../constants/routes';

type Props = {
  classes: object,
  match: object
};

const drawerWidth = 220;

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
const sideList = (
  <div>
    <List>
      {['History', 'Transfer', 'Delegate', 'Undelegate'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
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

class AccountPage extends Component<Props> {
  props: Props;

  render() {
    const {
      classes,
      match: { params }
    } = this.props;

    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{ paper: classNames(classes.drawerPaper) }}
        >
          {sideList}
        </Drawer>
        <main className={classes.content}>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <AccountInfoContainer accountName={params.name} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                History
              </Typography>
              <AccountActionsContainer accountName={params.name} />
              <Link to={routes.HOME}>
                <i className="fa fa-arrow-left fa-3x" />
              </Link>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(AccountPage);
