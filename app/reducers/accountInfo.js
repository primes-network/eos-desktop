// @flow
import { REQUEST_ACCOUNT, RECEIVE_ACCOUNT } from '../actions/accountInfo';
import type { Action } from './types';

export default function accountInfo(state = {}, action: Action) {
  switch (action.type) {
    case REQUEST_ACCOUNT:
      return state;
    case RECEIVE_ACCOUNT:
      return Object.assign({}, action.account);
    default:
      return state;
  }
}
