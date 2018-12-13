// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AccountInfoActions from '../actions/accountInfo';
import AccountInfo from '../components/AccountInfo';

type Props = {
  fetchAccountInfo: (accountName: string) => void,
  accountName: string,
  accountInfo: object
};

class AccountInfoContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    const { fetchAccountInfo, accountName } = this.props;
    fetchAccountInfo(accountName);
  }

  render() {
    const { accountInfo } = this.props;
    return <AccountInfo accountInfo={accountInfo} />;
  }
}

function mapStateToProps(state) {
  return {
    accountInfo: state.accountInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AccountInfoActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountInfoContainer);
