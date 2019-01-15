// @flow
import Store from 'electron-store';
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

export const dataStorage = () => getStore(DATA_FILE);

// const dataPath = remote.app.getPath('userData');

export const saveAccountToken = async (accountName, owns) => {
  const data = dataStorage().get(accountName) || {};
  data.owns = owns;
  dataStorage().set(accountName, data);
};

export const loadAccountToken = async (accountName: string) => {
  const data = dataStorage().get(accountName) || {};
  return data.owns;
};
