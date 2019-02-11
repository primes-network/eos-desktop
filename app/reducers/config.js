// @flow
import { CHANGE_EOS_NODE, SET_CONFIG } from '../actions/config';
import type { Action } from './types';

export default function config(state = {}, action: Action) {
  switch (action.type) {
    case CHANGE_EOS_NODE: {
      const newState = {
        ...state,
        nodeURL: action.nodeURL
      };

      return newState;
    }
    case SET_CONFIG:
      return action.config;
    default:
      return state;
  }
}
