/* @flow weak */

import Chrome from './components/Chrome.jsx';
import Home_Screen from './components/Home_Screen.jsx';
import User_Properties from './components/User_Properties.jsx';
import User_UpdatePassword from './components/User_UpdatePassword.jsx';

import ViewerQueries from './queries/ViewerQueries';


export default [
  {
    path: '/',
    component: Chrome,
    queries: ViewerQueries,
    indexRoute: {
      component: Home_Screen,
      queries: ViewerQueries,
    },
    childRoutes: [
      {
        path: 'User',
        indexRoute: {
          component: User_Properties,
          queries: ViewerQueries,
        },
        childRoutes: [
          {
            path: 'UpdatePassword',
            component: User_UpdatePassword,
            queries: ViewerQueries,
          },
        ],
      },
    ],
  },
];
