// @flow
import { fetchAccountActions } from './accountActions';

export const CHANGE_PAGINATION = 'CHANGE_PAGINATION';
function changePagination(page: integer, rowsPerPage: integer) {
  return {
    type: CHANGE_PAGINATION,
    pagination: { page, rowsPerPage }
  };
}

export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
export function setTotalCount(count: integer) {
  return {
    type: SET_TOTAL_COUNT,
    pagination: { count }
  };
}

export function updatePagination(page: integer, rowsPerPage: integer) {
  return (dispatch, getState) => {
    dispatch(changePagination(page, rowsPerPage));
    const { accountInfo } = getState();
    dispatch(fetchAccountActions(accountInfo.account_name, page, rowsPerPage));
  };
}
