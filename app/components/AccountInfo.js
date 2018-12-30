// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import AccountPermissions from './AccountPermissions';
import {
  formatNumber,
  convertStrToNum,
  convertStrToNumAndSum
} from '../utils/numConvert';

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
    const {
      classes,
      accountInfo: {
        account_name: accountName,
        core_liquid_balance: CoreLiquidBalance,
        self_delegated_bandwidth: selfDelegatedBandwidth,
        refund_request: refundRequest,
        ram_quota: ramQuota,
        ram_usage: ramUsage,
        cpu_weight: cpuWeight,
        cpu_limit: cpuLimit,
        net_weight: netWeight,
        net_limit: netLimit,
        permissions
      }
    } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={8}>
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
              <Typography variant="subtitle1">
                {convertStrToNum(CoreLiquidBalance)} EOS
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" gutterBottom>
                Staked
              </Typography>
              {selfDelegatedBandwidth && (
                <Typography variant="subtitle1">
                  {convertStrToNumAndSum(
                    selfDelegatedBandwidth.net_weight,
                    selfDelegatedBandwidth.cpu_weight
                  )}{' '}
                  EOS
                </Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" gutterBottom>
                Refunding
              </Typography>
              {refundRequest && (
                <Typography variant="subtitle1">
                  {convertStrToNumAndSum(
                    refundRequest.net_amount,
                    refundRequest.cpu_amount
                  )}{' '}
                  EOS
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" gutterBottom>
                RAM
              </Typography>
              <Typography variant="subtitle1">
                {formatNumber(ramUsage / 1024, 2)}KB /{' '}
                {formatNumber(ramQuota / 1024, 2)}KB
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" gutterBottom>
                CPU
              </Typography>
              {cpuLimit && (
                <Typography variant="subtitle1">
                  {formatNumber(cpuLimit.used / 1000, 3)}ms /{' '}
                  {formatNumber(cpuLimit.max / 1000, 3)}ms ({cpuWeight / 10000}{' '}
                  EOS)
                </Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" gutterBottom>
                NET
              </Typography>
              {netLimit && (
                <Typography variant="subtitle1">
                  {formatNumber(netLimit.used / 1024, 2)}KB /{' '}
                  {formatNumber(netLimit.max / 1024, 2)}KB ({netWeight / 10000}{' '}
                  EOS)
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
        <AccountPermissions permissions={permissions} />
      </Grid>
    );
  }
}

export default withStyles(styles)(AccountInfo);
