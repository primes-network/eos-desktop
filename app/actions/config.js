// @flow
import { saveConfig, loadConfig } from '../services/storageService';

export const CHANGE_EOS_NODE = 'CHANGE_EOS_NODE';
export function changeEOSNode(nodeURL: string) {
  return {
    type: CHANGE_EOS_NODE,
    nodeURL
  };
}

export function changeEOSNodeAndSyncStorage(nodeURL: string) {
  return (dispatch, getState) => {
    dispatch(changeEOSNode(nodeURL));
    return saveConfig(getState().config);
  };
}

export const SET_CONFIG = 'SET_CONFIG';
function setConfig(config: object) {
  return {
    type: SET_CONFIG,
    config
  };
}

export function loadConfigFromStorage() {
  return dispatch => loadConfig().then(config => dispatch(setConfig(config)));
}
