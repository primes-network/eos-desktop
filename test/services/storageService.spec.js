import {
  dataStorage,
  saveAccountToken
} from '../../app/services/storageService';

describe('storage service', () => {
  it('can store data', done => {
    const data = { a: 1, b: 2 };
    dataStorage().set('k1', data);

    return dataStorage()
      .get('k1')
      .then(fetchedData => {
        console.log(fetchedData);
        expect(fetchedData).toBe(data);
        return done();
      });
  });

  it('can save accountToken owns data', done => {
    const owns = {
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
    };

    return saveAccountToken('account name', owns).then(() =>
      dataStorage()
        .get('account name')
        .then(data => {
          console.log(data);
          return done();
        })
    );
  });
});
