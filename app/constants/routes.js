import HomePage from '../containers/HomePage';
import AccountHomePage from '../containers/AccountHomePage';
import AccountHistory from '../components/AccountHistory';
import AccountTokenPage from '../containers/AccountTokenPage';

export const rootRoutes = {
  HOME: {
    path: '/',
    component: HomePage
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
