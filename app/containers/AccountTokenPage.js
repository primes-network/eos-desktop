// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AccountInfoActions from '../actions/accountInfo';

type Props = {
  accountName: string
};

class AccountTokenPage extends Component<Props> {
  props: Props;

  render() {
    const { accountName } = this.props;
    return <div>{accountName}ahahah</div>;
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
)(AccountTokenPage);
