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
  },
  permissionTitle: {
    marginTop: 15
  }
});

class AccountPermissions extends Component<Props> {
  props: Props;

  render() {
    const { classes, permissions } = this.props;
    const permissionGrid =
      permissions === undefined
        ? null
        : permissions.map(permission => (
            <Grid container key={permission.perm_name}>
              <Grid item xs={2}>
                <Typography variant="subtitle2">
                  {permission.perm_name}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                {permission.required_auth.keys.map(k => (
                  <Typography variant="subtitle2" key={k.key}>
                    {k.key}
                  </Typography>
                ))}
              </Grid>
              <Divider />
            </Grid>
          ));
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            className={classes.permissionTitle}
          >
            Permissions
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>{permissionGrid}</Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AccountPermissions);
