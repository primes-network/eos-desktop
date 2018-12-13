// @flow
import React, { Component } from 'react';

type Props = {
  accountInfo: object
};

export default class AccountInfo extends Component<Props> {
  props: Props;

  render() {
    const { accountInfo } = this.props;
    return (
      <div>
        <div>{accountInfo.account_name}</div>
        <div>{accountInfo.core_liquid_balance}</div>
        <div>{accountInfo.ram_quota}</div>
        <div>{accountInfo.net_weight}</div>
      </div>
    );
  }
}
