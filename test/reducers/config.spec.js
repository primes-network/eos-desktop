import config from '../../app/reducers/config';
import { CHANGE_EOS_NODE } from '../../app/actions/config';

describe('reducers', () => {
  describe('config', () => {
    it('should handle CHANGE_EOS_NODE', () => {});
    const initState = {};
    const nodeURL = 'https://localhost';
    const newState = config(initState, {
      type: CHANGE_EOS_NODE,
      nodeURL
    });
    expect(newState.nodeURL).toEqual(nodeURL);
  });
});
