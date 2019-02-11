import * as actions from '../../app/actions/config';

describe('actions', () => {
  describe('config', () => {
    it('Change EOS Node', () => {
      const eosNode = 'https://localhost';
      const a = actions.changeEOSNode(eosNode);

      expect(a).toEqual({
        type: actions.CHANGE_EOS_NODE,
        nodeURL: eosNode
      });
    });
  });
});
