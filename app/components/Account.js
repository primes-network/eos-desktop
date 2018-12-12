// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

type Props = {
  fetchAccount: () => void,
  account: object
};

export default class Counter extends Component<Props> {
  props: Props;

  componentDidMount() {
    const { fetchAccount } = this.props;
    fetchAccount('betthefuture');
  }

  render() {
    const { account } = this.props;
    return (
      <div>
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
        <div>{account.account_name}</div>
        <div>{account.core_liquid_balance}</div>
        <div>{account.ram_quota}</div>
        <div>{account.net_weight}</div>
      </div>
    );
  }
}
