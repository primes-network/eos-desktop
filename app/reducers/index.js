// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import accountInfo from './accountInfo';
import accountActions from './accountActions';
import accountToken from './accountToken';
import config from './config';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    accountInfo,
    accountActions,
    accountToken,
    config
  });
}
