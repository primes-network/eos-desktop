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

  static convertStrToNum(strValue: string): number {
    return parseFloat(strValue).toFixed(4);
  }

  static convertStrToNumAndSum(strValue1: string, strValue2: string): number {
    return (parseFloat(strValue1) + parseFloat(strValue2)).toFixed(4);
  }

  render() {
    const {
      classes,
      accountInfo: {
        account_name: accountName,
        core_liquid_balance: CoreLiquidBalance,
        self_delegated_bandwidth: selfDelegatedBandwidth,
        refund_request: refundRequest
      }
    } = this.props;
    return (
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>
              Account Name
            </Typography>
            <Typography variant="h5">{accountName}</Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption" gutterBottom>
              Unstaked
            </Typography>
            <Typography variant="h6">
              {AccountInfo.convertStrToNum(CoreLiquidBalance)}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption" gutterBottom>
              Staked
            </Typography>
            {selfDelegatedBandwidth && (
              <Typography variant="h6">
                {AccountInfo.convertStrToNumAndSum(
                  selfDelegatedBandwidth.net_weight,
                  selfDelegatedBandwidth.cpu_weight
                )}
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption" gutterBottom>
              Refunding
            </Typography>
            {refundRequest && (
              <Typography variant="h6">
                {AccountInfo.convertStrToNumAndSum(
                  refundRequest.net_amount,
                  refundRequest.cpu_amount
                )}
              </Typography>
            )}
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
