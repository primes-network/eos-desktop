// @flow
import { CHANGE_PAGINATION, SET_TOTAL_COUNT } from '../actions/pagination';
import type { Action } from './types';

export default function pagination(
  state = { page: 0, rowsPerPage: 10, count: 0 },
  action: Action
) {
  switch (action.type) {
    case CHANGE_PAGINATION:
    case SET_TOTAL_COUNT:
      return Object.assign({}, state, action.pagination);
    default:
      return state;
  }
}
