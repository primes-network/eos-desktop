import accountToken from '../../app/reducers/accountToken';
import {
  RECEIVE_TOKEN_LIST,
  RECEIVE_ACCOUNT_TOKEN,
  REMOVE_ACCOUNT_TOKEN
} from '../../app/actions/accountToken';

describe('reducers', () => {
  describe('accountToken', () => {
    it('should handle RECEIVE_TOKEN_LIST', () => {
      const initState = { all: [{ name: 'EXIST' }], owns: {} };
      const json = [
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
      const newState = accountToken(initState, {
        type: RECEIVE_TOKEN_LIST,
        json
      });
      expect(newState.all).toEqual(json);
    });

    it('should handle RECEIVE_ACCOUNT_TOKEN', () => {
      const initState = {
        all: [{ name: 'EXIST' }],
        owns: { 'EXIST-account': { balance: '1' } }
      };
      const token = {
        name: 'NUTS',
        logo:
          'https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/logos/nuts.png',
        logo_lg:
          'https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/logos/nuts-lg.png',
        symbol: 'NUTS',
        account: 'nutscontract'
      };

      const newState = accountToken(initState, {
        type: RECEIVE_ACCOUNT_TOKEN,
        accountName: 'account name',
        token,
        json: '123 NUTS',
        receivedAt: Date.now()
      });
      console.log(newState);
      expect(newState.owns['EXIST-account']).not.toBeNull();
      expect(newState.owns['NUTS-nutscontract'].balance).toEqual('123.0000');
    });

    it('should handle REMOVE_ACCOUNT_TOKEN', () => {
      const initState = {
        all: [{ name: 'EXIST' }],
        owns: {
          'EXIST-account': { balance: '1' },
          'NUTS-nutscontract': {
            token: {
              name: 'NUTS',
              logo:
                'https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/logos/nuts.png',
              logo_lg:
                'https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/logos/nuts-lg.png',
              symbol: 'NUTS',
              account: 'nutscontract'
            },
            balance: '123.0000'
          }
        }
      };

      const newState = accountToken(initState, {
        type: REMOVE_ACCOUNT_TOKEN,
        accountName: 'account name',
        tokenKey: 'NUTS-nutscontract'
      });

      console.log(newState);
      expect(newState.owns['NUTS-nutscontract']).toBeUndefined();
    });
  });
});
