// @flow
import fetch from 'cross-fetch';

export const REQUEST_ACCOUNT_ACTIONS = 'REQUEST_ACCOUNT_ACTIONS';
function requestAccountActions(accountName) {
  return {
    type: REQUEST_ACCOUNT_ACTIONS,
    accountName
  };
}

export const RECEIVE_ACCOUNT_ACTIONS = 'RECEIVE_ACCOUNT_ACTIONS';
function receiveAccountActions(accountName, json) {
  return {
    type: RECEIVE_ACCOUNT_ACTIONS,
    accountName,
    accountActions: json,
    receivedAt: Date.now()
  };
}

export const RESET_ACCOUNT_ACTIONS = 'RESET_ACCOUNT_ACTIONS';
export function resetAccountActions() {
  return {
    type: RESET_ACCOUNT_ACTIONS
  };
}

export function fetchAccountActions(
  accountName: string,
  page: integer,
  rowsPerPage: integer,
  refresh: boolean = false
) {
  return (dispatch, getState) => {
    dispatch(requestAccountActions(accountName));
    const { count } = getState().accountActions;
    if (count === 0 || refresh) {
      return postAccountActionsWithOffset(accountName, -1, -1) // get the last pos
        .then(response => {
          if (response.status >= 400) {
            console.error(response.text());
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then(json => json.actions[0].account_action_seq)
        .then(seq => {
          dispatch(setTotalCount(seq + 1));
          return postAccountActionsWithOffset(
            accountName,
            seq - (page + 1) * rowsPerPage + 1,
            rowsPerPage - 1
          );
        })
        .then(response => {
          if (response.status >= 400) {
            console.error(response.text());
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then(json => dispatch(receiveAccountActions(accountName, json)))
        .catch(err => {
          console.error(err);
        });
    }
    return postAccountActionsWithOffset(
      accountName,
      count - (page + 1) * rowsPerPage,
      rowsPerPage - 1
    )
      .then(response => {
        if (response.status >= 400) {
          console.error(response.text());
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then(json => dispatch(receiveAccountActions(accountName, json)))
      .catch(err => {
        console.error(err);
      });
  };
}

// Call EOS node history actions API with 'pos' and 'offset' being set
function postAccountActionsWithOffset(
  accountName: string,
  pos: integer,
  offset: integer
): Promise {
  return fetch('https://node.eosflare.io/v1/history/get_actions', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pos,
      offset,
      account_name: accountName
    })
  });
}

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

export function updatePagination(
  page: integer,
  rowsPerPage: integer,
  refresh: boolean = false
) {
  return (dispatch, getState) => {
    dispatch(changePagination(page, rowsPerPage));
    const { accountInfo } = getState();
    dispatch(
      fetchAccountActions(accountInfo.account_name, page, rowsPerPage, refresh)
    );
  };
}
