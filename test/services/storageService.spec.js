import { dataStorage } from '../../app/services/storageService';

describe('storage service', () => {
  it('can store data', () => {
    const data = { a: 1, b: 2 };
    dataStorage().set('k1', data);

    const fetchedData = dataStorage().get('k1');
    expect(fetchedData).toBe(data);
  });
});
