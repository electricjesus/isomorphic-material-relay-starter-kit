import Chrome from './components/Chrome.jsx';
import Home_Screen from './components/Home_Screen.jsx';
import MUI_Icons from './components/MUI_Icons.jsx';
import MUI_Home from './components/MUI_Home.jsx';
import ToDo_Screen from './components/ToDo_Screen.jsx';
import ToDo_List from './components/ToDo_List.jsx';
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
            path: 'todos',
            component: ToDo_Screen,
            queries: ViewerQueries,
            indexRoute: {
                component: ToDo_List,
                queries: ViewerQueries,
                prepareParams: () => ({status: 'any'}),
            },
            childRoutes: [
                {
                    path: ':status',
                    component: ToDo_List,
                    queries: ViewerQueries,
                },
            ],
          },
          {
            path: 'mui',
            indexRoute: {
                component: ToDo_List,
                component: MUI_Home,
                queries: ViewerQueries,
            },
            childRoutes: [
                {
                    path: 'icons',
                    component: MUI_Icons,
                    queries: ViewerQueries,
                },
            ],
          },
        ],
    },
];
