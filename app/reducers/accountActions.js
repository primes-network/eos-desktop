// @flow
import {
  RECEIVE_ACCOUNT_ACTIONS,
  CHANGE_PAGINATION,
  SET_TOTAL_COUNT
} from '../actions/accountActions';
import type { Action } from './types';

export default function accountActions(
  state = { actions: {}, page: 0, rowsPerPage: 10, count: 0 },
  action: Action
) {
  switch (action.type) {
    case RECEIVE_ACCOUNT_ACTIONS:
      // sort by block time DESC
      action.accountActions.actions.sort(
        (b, a) =>
          new Date(a.block_time).getTime() - new Date(b.block_time).getTime()
      );
      return Object.assign({}, state, action.accountActions);
    case CHANGE_PAGINATION:
    case SET_TOTAL_COUNT:
      return Object.assign(
        {},
        state,
        Object.assign({}, state.pagination, action.pagination)
      );
    default:
      return state;
  }
}
