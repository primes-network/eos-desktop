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

export function fetchAccountActions(accountName) {
  return dispatch => {
    dispatch(requestAccountActions(accountName));
    return fetch('https://node.eosflare.io/v1/history/get_actions', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        offset: -9999999,
        account_name: accountName
      })
    })
      .then(response => response.json())
      .then(json => dispatch(receiveAccountActions(accountName, json)));
  };
}
