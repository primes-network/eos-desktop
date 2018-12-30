import HomePage from '../containers/HomePage';
import AccountHomePage from '../containers/AccountHomePage';
import CounterPage from '../containers/CounterPage';
import AccountHistory from '../components/AccountHistory';
import AccountTokenPage from '../containers/AccountTokenPage';

export const rootRoutes = {
  HOME: {
    path: '/',
    component: HomePage
  },
  COUNTER: {
    path: '/counter',
    component: CounterPage
  },
  ACCOUNT: {
    path: '/account/:name',
    component: AccountHomePage
  }
};

export const accountRoutes = {
  HISTORY: {
    path: '/account/:name/history',
    component: AccountHistory
  },
  TOKEN: {
    path: '/account/:name/token',
    component: AccountTokenPage
  }
};
