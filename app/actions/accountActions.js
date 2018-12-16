// @flow
import fetch from 'cross-fetch';
import { setTotalCount } from './pagination';

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

export function fetchAccountActions(
  accountName: string,
  page: integer,
  rowsPerPage: integer
) {
  return (dispatch, getState) => {
    dispatch(requestAccountActions(accountName));
    const { count } = getState().pagination;
    if (count === 0) {
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
          console.log(seq - (page + 1) * rowsPerPage + 1, rowsPerPage - 1);
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
