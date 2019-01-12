// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AccountTokenActions from '../actions/accountToken';
import AccountToken from '../components/AccountToken';

type Props = {
  match: object,
  fetchTokenList: () => void,
  fetchAccountToken: () => void,
  removeAccountToken: () => void,
  accountToken: object
};

class AccountTokenPage extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    const { fetchTokenList } = props;
    fetchTokenList();
  }

  render() {
    const {
      accountToken,
      fetchAccountToken,
      removeAccountToken,
      match: { params }
    } = this.props;
    return (
      <AccountToken
        all={accountToken.all}
        owns={accountToken.owns}
        accountName={params.name}
        fetchAccountToken={fetchAccountToken}
        removeAccountToken={removeAccountToken}
      />
    );
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
