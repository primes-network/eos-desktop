// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountInfoContainer from '../containers/AccountInfoContainer';
import AccountActionsContainer from '../containers/AccountActionsContainer';

type Props = {
  match: object
};

class AccountHistory extends Component<Props> {
  props: Props;

  render() {
    const {
      match: { params }
    } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <AccountInfoContainer accountName={params.name} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            History
          </Typography>
          <AccountActionsContainer accountName={params.name} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles()(AccountHistory);
