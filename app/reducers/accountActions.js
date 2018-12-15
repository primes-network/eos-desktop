// @flow
import { RECEIVE_ACCOUNT_ACTIONS } from '../actions/accountActions';
import type { Action } from './types';

export default function accountActions(state = {}, action: Action) {
  switch (action.type) {
    case RECEIVE_ACCOUNT_ACTIONS:
      // sort by block time DESC
      action.accountActions.actions.sort(
        (b, a) =>
          new Date(a.block_time).getTime() - new Date(b.block_time).getTime()
      );
      return Object.assign({}, action.accountActions);
    default:
      return state;
  }
}
