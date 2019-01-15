// @flow
import {
  REQUEST_ACCOUNT_TOKEN,
  RECEIVE_ACCOUNT_TOKEN,
  REMOVE_ACCOUNT_TOKEN,
  SET_ACCOUNT_TOKENS,
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
      return { ...state, all: action.json };
    case REQUEST_ACCOUNT_TOKEN:
      return state;
    case RECEIVE_ACCOUNT_TOKEN: {
      const balance = convertStrToNum(action.json);
      return {
        ...state,
        owns: {
          ...state.owns,
          [`${action.token.symbol}-${action.token.account}`]: {
            token: action.token,
            balance
          }
        }
      };
    }
    case REMOVE_ACCOUNT_TOKEN: {
      const { [action.tokenKey]: value, ...other } = state.owns;
      return {
        ...state,
        owns: {
          ...other
        }
      };
    }
    case SET_ACCOUNT_TOKENS:
      return {
        ...state,
        owns: action.owns
      };
    case RESET_ACCOUNT_TOKEN:
      return {};
    default:
      return state;
  }
}
