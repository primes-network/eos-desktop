// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AccountActionActions from '../actions/accountActions';
import AccountActions from '../components/AccountActions';

type Props = {
  fetchAccountActions: (accountName: string) => void,
  accountName: string,
  accountActions: object
};

class AccountActionsContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    const { fetchAccountActions, accountName } = this.props;
    fetchAccountActions(accountName);
  }

  render() {
    const { accountActions } = this.props;
    return <AccountActions accountActions={accountActions} />;
  }
}

function mapStateToProps(state) {
  return {
    accountActions: state.accountActions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AccountActionActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountActionsContainer);
