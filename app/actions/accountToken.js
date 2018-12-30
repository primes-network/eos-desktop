// @flow
import fetch from 'cross-fetch';

export const REQUEST_ACCOUNT_TOKEN = 'REQUEST_ACCOUNT_TOKEN';
function requestAccountToken(accountName: string, symbol: string) {
  return {
    type: REQUEST_ACCOUNT_TOKEN,
    accountName,
    symbol
  };
}

export const RECEIVE_ACCOUNT_TOKEN = 'RECEIVE_ACCOUNT_TOKEN';
function receiveAccountToken(
  accountName: string,
  tokenAccount: string,
  symbol: string,
  json
) {
  return {
    type: RECEIVE_ACCOUNT_TOKEN,
    accountName,
    tokenAccount,
    symbol,
    json,
    receivedAt: Date.now()
  };
}

export const RESET_ACCOUNT_TOKEN = 'RESET_ACCOUNT_TOKEN';
export function resetAccountToken() {
  return {
    type: RESET_ACCOUNT_TOKEN
  };
}

export function fetchAccountToken(accountName: string) {
  return dispatch =>
    fetch(
      'https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/tokens.json',
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(tokensJson =>
        tokensJson.map(token => {
          dispatch(requestAccountToken(accountName));
          return fetch(
            'https://api.eosnewyork.io/v1/chain/get_currency_balance',
            {
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                code: token.account,
                account: accountName,
                symbol: token.symbol
              })
            }
          )
            .then(response => response.json())
            .then(json =>
              dispatch(
                receiveAccountToken(
                  accountName,
                  token.account,
                  token.symbol,
                  json
                )
              )
            );
        })
      );
}
