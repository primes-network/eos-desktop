// import { spy } from 'sinon';
import * as actions from '../../app/actions/accountActions';

describe('accountActionActions', () => {
  it('should incrementIfOdd should create increment action', () => {
    const fn = actions.fetchAccountActions('dappinventor', 0, 10);
    expect(fn).toBeInstanceOf(Function);
    // const dispatch = spy();
    // const getState = () => ({ accountActionActions: {} });
    // fn(dispatch, getState);
    // expect(dispatch.calledWith({ type: actions.REQUEST_ACCOUNT_ACTIONS})).toBe(true);
  });
});
