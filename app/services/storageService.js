import { Store } from 'electron-store';
import { RUNNING_TESTS, TestStore } from '../utils/testHelper';
// import { remote } from '../utils/electronHelper';

const DATA_FILE = 'data';

const stores = {};
const getStore = name => {
  if (!Object.prototype.hasOwnProperty.call(stores, name)) {
    stores[name] = RUNNING_TESTS ? new TestStore(name) : new Store({ name });
  }

  return stores[name];
};

// export const dataStorage = () => getStore(DATA_FILE);
export default () => getStore(DATA_FILE);

// const dataPath = remote.app.getPath('userData');
