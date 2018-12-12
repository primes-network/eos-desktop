// @flow
import fetch from 'cross-fetch';

export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT';
function requestAccount(accountName) {
  return {
    type: REQUEST_ACCOUNT,
    accountName
  };
}

export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT';
function receiveAccount(accountName, json) {
  return {
    type: RECEIVE_ACCOUNT,
    accountName,
    account: json,
    receivedAt: Date.now()
  };
}

export function fetchAccount(accountName) {
  return dispatch => {
    dispatch(requestAccount(accountName));
    return fetch('https://node.eosflare.io/v1/chain/get_account', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        account_name: accountName
      })
    })
      .then(response => response.json())
      .then(json => dispatch(receiveAccount(accountName, json)));
  };
}
