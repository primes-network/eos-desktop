// @flow
import fetch from 'cross-fetch';

export const REQUEST_ACCOUNT_INFO = 'REQUEST_ACCOUNT_INFO';
function requestAccountInfo(accountName: string) {
  return {
    type: REQUEST_ACCOUNT_INFO,
    accountName
  };
}

export const RECEIVE_ACCOUNT_INFO = 'RECEIVE_ACCOUNT_INFO';
function receiveAccountInfo(accountName: string, json) {
  return {
    type: RECEIVE_ACCOUNT_INFO,
    accountName,
    account: json,
    receivedAt: Date.now()
  };
}

export const RESET_ACCOUNT_INFO = 'RESET_ACCOUNT_INFO';
export function resetAccountInfo() {
  return {
    type: RESET_ACCOUNT_INFO
  };
}

export function fetchAccountInfo(accountName: string) {
  return dispatch => {
    dispatch(requestAccountInfo(accountName));
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
      .then(json => dispatch(receiveAccountInfo(accountName, json)));
  };
}
