// @flow
import { REQUEST_ACCOUNT, RECEIVE_ACCOUNT } from '../actions/account';
import type { Action } from './types';

export default function account(state = {}, action: Action) {
  switch (action.type) {
    case REQUEST_ACCOUNT:
      return state;
    case RECEIVE_ACCOUNT:
      console.log(action.account);
      return Object.assign({}, action.account);
    default:
      return state;
  }
}
