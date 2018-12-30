// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AccountTokenActions from '../actions/accountToken';
import AccountToken from '../components/AccountToken';

type Props = {
  match: object,
  fetchAccountToken: () => void,
  accountToken: object
};

class AccountTokenPage extends Component<Props> {
  props: Props;

  componentDidMount() {
    const {
      fetchAccountToken,
      match: { params }
    } = this.props;
    fetchAccountToken(params.name);
  }

  render() {
    const { accountToken } = this.props;
    return <AccountToken tokens={accountToken} />;
  }
}

function mapStateToProps(state) {
  return {
    accountToken: state.accountToken
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AccountTokenActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountTokenPage);
