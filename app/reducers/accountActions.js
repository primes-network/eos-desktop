// @flow
import {
  REQUEST_ACCOUNT_ACTIONS,
  RECEIVE_ACCOUNT_ACTIONS,
  CHANGE_PAGINATION,
  SET_TOTAL_COUNT,
  RESET_ACCOUNT_ACTIONS
} from '../actions/accountActions';
import type { Action } from './types';

const initState = {
  actions: {},
  page: 0,
  rowsPerPage: 10,
  count: 0,
  loading: false
};

export default function accountActions(state = initState, action: Action) {
  switch (action.type) {
    case REQUEST_ACCOUNT_ACTIONS:
      return Object.assign({}, state, { loading: true });
    case RECEIVE_ACCOUNT_ACTIONS: {
      // sort by block time DESC
      action.accountActions.actions.sort(
        (b, a) =>
          new Date(a.block_time).getTime() - new Date(b.block_time).getTime()
      );
      const newState = Object.assign({}, state, action.accountActions);
      newState.loading = false;
      return newState;
    }
    case CHANGE_PAGINATION:
    case SET_TOTAL_COUNT:
      return Object.assign(
        {},
        state,
        Object.assign({}, state.pagination, action.pagination)
      );
    case RESET_ACCOUNT_ACTIONS:
      return initState;
    default:
      return state;
  }
}
