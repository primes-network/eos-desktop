// @flow
import {
  REQUEST_ACCOUNT_INFO,
  RECEIVE_ACCOUNT_INFO,
  RESET_ACCOUNT_INFO
} from '../actions/accountInfo';
import type { Action } from './types';

export default function accountInfo(state = {}, action: Action) {
  switch (action.type) {
    case REQUEST_ACCOUNT_INFO:
      return state;
    case RECEIVE_ACCOUNT_INFO:
      return Object.assign({}, action.account);
    case RESET_ACCOUNT_INFO:
      return {};
    default:
      return state;
  }
}
