// @flow
import type { Action } from './types';

export default function pagination(
  state = { page: 0, rowsPerPage: 10 },
  action: Action
) {
  switch (action.type) {
    default:
      return state;
  }
}
