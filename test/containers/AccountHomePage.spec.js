import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
// import { createBrowserHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import AccountHomePage from '../../app/containers/AccountHomePage';
import { configureStore } from '../../app/store/configureStore';

Enzyme.configure({ adapter: new Adapter() });

function setup(initialState) {
  const store = configureStore(initialState);
  // const history = createBrowserHistory();
  const provider = (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/account/betthefuture/history']}>
        <AccountHomePage />
      </MemoryRouter>
    </Provider>
  );
  const app = mount(provider);
  return {
    app,
    buttons: app.find('ListItem')
  };
}

describe('containers', () => {
  describe('AccountHomePage', () => {
    it('should display history tab', done => {
      const { buttons } = setup();
      setTimeout(() => {
        expect(buttons.at(0).text()).toMatch('History');
        done();
      }, 5);
    });

    it('should display token tab', done => {
      const { buttons } = setup();
      setTimeout(() => {
        expect(buttons.at(1).text()).toMatch('Token');
        done();
      }, 5);
    });
  });
});
