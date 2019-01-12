export const RUNNING_TESTS = process.env.NODE_ENV === 'test';

const mockWindow = {};
export const MOCK_ELECTRON = {
  ipcRenderer: {
    on: (x, cb) => cb(),
    sendTo: (x, cb) => cb()
  },
  clipboard: { writeText: () => true },
  shell: { openExternal: () => true },
  remote: {
    getCurrentWindow: () => mockWindow,
    app: {
      quit: () => true,
      BrowserWindow: {
        getFocusedWindow: () => mockWindow,
        fromId: () => mockWindow
      },
      getPath: () => '',
      getVersion: () => '0.0.0'
    },
    process: {
      platform: 'win32'
    },
    getGlobal: () => ({
      Transport: {
        default: true
      },
      NotificationService: {
        pushNotification: () => true
      },
      ApiWatcher: {},
      LowLevelWindowService: {
        openPopOut: () => true
      }
    }),
    dialog: {
      showOpenDialog: () => true
    },
    Menu: {
      buildFromTemplate: () => ({
        popup: () => true
      })
    }
  }
};

export class TestStore {
  constructor() {
    this.store = {};
  }

  async get(key) {
    return this.store[key];
  }

  async set(key, val) {
    this.store[key] = val;
    return true;
  }

  async clear() {
    this.store = {};
    return true;
  }
}
