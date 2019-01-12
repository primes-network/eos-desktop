import { fetch } from 'cross-fetch';
import * as actions from '../../app/actions/accountToken';
import { configureStore } from '../../app/store/configureStore';

jest.mock('cross-fetch');

const { Response } = jest.requireActual('cross-fetch');

const store = configureStore();

describe('actions', () => {
  describe('AccountToken', () => {
    it('fetch token list', done => {
      const responseObject = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const responseBody = [
        {
          name: 'NUTS',
          logo:
            'https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/logos/nuts.png',
          logo_lg:
            'https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/logos/nuts-lg.png',
          symbol: 'NUTS',
          account: 'nutscontract'
        }
      ];

      fetch.mockReturnValue(
        Promise.resolve(
          new Response(JSON.stringify(responseBody), responseObject)
        )
      );

      const fn = actions.fetchTokenList();
      expect(fn).toBeInstanceOf(Function);
      fn(store.dispatch, store.getState);

      setTimeout(() => {
        console.log(store.getState().accountToken.all);
        expect(store.getState().accountToken.all.length).toBe(1);
        expect(store.getState().accountToken.all[0].name).toBe('NUTS');
        done();
      }, 5);
    });
  });
});
