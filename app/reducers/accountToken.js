// @flow
import {
  REQUEST_ACCOUNT_TOKEN,
  RECEIVE_ACCOUNT_TOKEN,
  RESET_ACCOUNT_TOKEN,
  REQUEST_TOKEN_LIST,
  RECEIVE_TOKEN_LIST
} from '../actions/accountToken';
import type { Action } from './types';
import { convertStrToNum } from '../utils/numConvert';

export default function accountToken(
  state = { all: [], owns: {} },
  action: Action
) {
  switch (action.type) {
    case REQUEST_TOKEN_LIST:
      return state;
    case RECEIVE_TOKEN_LIST:
      return Object.assign({}, state, { all: action.json });
    case REQUEST_ACCOUNT_TOKEN:
      return state;
    case RECEIVE_ACCOUNT_TOKEN: {
      const balance = convertStrToNum(action.json);
      return Object.assign({}, state, {
        owns: Object.assign({}, state.owns, {
          [`${action.token.symbol}-${action.token.account}`]: {
            token: action.token,
            balance
          }
        })
      });
    }
    case RESET_ACCOUNT_TOKEN:
      return {};
    default:
      return state;
  }
}
