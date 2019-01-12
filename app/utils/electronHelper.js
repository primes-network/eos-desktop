import { MOCK_ELECTRON, RUNNING_TESTS } from './testHelper';

let electron;
electron = RUNNING_TESTS ? null : window.require('electron');
if (!electron) electron = MOCK_ELECTRON;

// export const remote = electron.remote;
// export const ipcRenderer = electron.ipcRenderer;
// const {clipboard, shell} = electron;
