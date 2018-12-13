// @flow
import { RECEIVE_ACCOUNT_ACTIONS } from '../actions/accountActions';
import type { Action } from './types';

export default function accountActions(state = {}, action: Action) {
  switch (action.type) {
    case RECEIVE_ACCOUNT_ACTIONS:
      return Object.assign({}, action.accountActions);
    default:
      return state;
  }
}
