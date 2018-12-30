// @flow
import {
  REQUEST_ACCOUNT_TOKEN,
  RECEIVE_ACCOUNT_TOKEN,
  RESET_ACCOUNT_TOKEN
} from '../actions/accountToken';
import type { Action } from './types';
import { convertStrToNum } from '../utils/numConvert';

export default function accountToken(state = {}, action: Action) {
  switch (action.type) {
    case REQUEST_ACCOUNT_TOKEN:
      return Object.assign({}, state, {});
    case RECEIVE_ACCOUNT_TOKEN: {
      if (action.json.length === 0) {
        return state;
      }

      const balance = convertStrToNum(action.json);
      return Object.assign({}, state, {
        [action.symbol]: { account: action.tokenAccount, balance }
      });
    }
    case RESET_ACCOUNT_TOKEN:
      return {};
    default:
      return state;
  }
}
