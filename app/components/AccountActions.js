// @flow
import React, { Component } from 'react';

type Props = {
  accountActions: object
};

export default class AccountActions extends Component<Props> {
  props: Props;

  render() {
    const { accountActions } = this.props;

    const actions = [];
    if (accountActions.actions) {
      Object.keys(accountActions.actions).forEach(key => {
        actions.push(
          <li key={key}>
            {accountActions.actions[key].action_trace.act.data.memo}
          </li>
        );
      });
    }
    return (
      <div>
        <ul>{actions}</ul>
      </div>
    );
  }
}
