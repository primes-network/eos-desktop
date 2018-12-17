// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

type Props = {
  classes: object,
  accountInfo: object
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

class AccountInfo extends Component<Props> {
  props: Props;

  render() {
    const { classes, accountInfo } = this.props;
    return (
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>
              Account Name
            </Typography>
            <Typography variant="h5">{accountInfo.account_name}</Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption" gutterBottom>
              Unstaked
            </Typography>
            <Typography variant="h6">
              {accountInfo.core_liquid_balance}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption" gutterBottom>
              Staked
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption" gutterBottom>
              Refunding
            </Typography>
            <Typography variant="h6">{accountInfo.refund_request}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider className={classes.divider} />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(AccountInfo);
