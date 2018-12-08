// import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs';
import { JsonRpc } from 'eosjs';
import fetch from 'cross-fetch';
// import { TextDecoder, TextEncoder } from 'text-encoding'; // node, IE11 and IE Edge Browsers

// const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
const rpc = new JsonRpc('https://api.eosnewyork.io', { fetch });

// const defaultPrivateKey = '5J9b3xMkbvcT6gYv2EpQ8FD4ZBjgypuNKwE1jxkd7Wd1DYzhk88'; // bob
// const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
// const api = new Api({
//   rpc,
//   signatureProvider,
//   textDecoder: new TextDecoder(),
//   textEncoder: new TextEncoder()
// });

describe('description', () => {
  it('should have info', () => {
    // rpc
    //   .get_info()
    //   .then(result => console.log(result))
    //   .catch(error => console.error(error));
    // rpc
    //   .get_account('alice')
    //   .then(result => console.log(result))
    //   .catch(error => console.error(error));
    rpc
      .history_get_actions('betthefuture')
      .then(result => {
        result.actions.forEach(element => {
          console.log(element);
        });
        return true;
      })
      .catch(error => console.error(error));
    // rpc
    //   .history_get_actions('bob')
    //   .then(result => console.log(result))
    //   .catch(error => console.error(error));
  });

  // it('api', () => {
  //   (async () => {
  //     const result = await api.transact(
  //       {
  //         actions: [
  //           {
  //             account: 'eosio.token',
  //             name: 'transfer',
  //             authorization: [
  //               {
  //                 actor: 'bob',
  //                 permission: 'active'
  //               }
  //             ],
  //             data: {
  //               from: 'bob',
  //               to: 'alice',
  //               quantity: '0.0001 SYS',
  //               memo: ''
  //             }
  //           }
  //         ]
  //       },
  //       {
  //         blocksBehind: 3,
  //         expireSeconds: 30
  //       }
  //     );
  //     console.dir(result);
  //   })();
  // });
});
