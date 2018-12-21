// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

type Props = {
  classes: object,
  permissions: Array<object>
};

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  divider: {
    marginTop: 5,
    marginBottom: 8
  }
});

class AccountPermissions extends Component<Props> {
  props: Props;

  render() {
    const { classes, permissions } = this.props;
    const permissionGrid =
      permissions === undefined
        ? null
        : permissions.forEach((item, i) => (
            <div key={i.toString()}>
              <Grid item xs={2}>
                <Typography variant="h6">{item.perm_name}</Typography>
              </Grid>
              <Grid item xs={10}>
                {item.required_auth.keys.forEach((k, j) => (
                  <Typography variant="h6" key={j.toString()}>
                    {k.key}
                  </Typography>
                ))}
              </Grid>
              <Divider />
            </div>
          ));
    return (
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Permissions
        </Typography>
        <Paper className={classes.paper}>{permissionGrid}</Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(AccountPermissions);
