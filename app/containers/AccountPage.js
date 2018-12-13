// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import AccountInfoContainer from './AccountInfoContainer';
import AccountActionsContainer from './AccountActionsContainer';

type Props = {
  //   accountName: string
};

export default class AccountPage extends Component<Props> {
  props: Props;

  render() {
    // const { accountName } = this.props;
    return (
      <div>
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
        <AccountInfoContainer accountName="betthefuture" />
        <AccountActionsContainer accountName="betthefuture" />
      </div>
    );
  }
}
