import App from './components/App';
import Home from './components/Home';
import MUI_Icons from './components/MUI_Icons';
import MUI_Home from './components/MUI_Home';
import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';
import ViewerQueries from './queries/ViewerQueries';

export default [
    {
        path: '/',
        component: App,
        queries: ViewerQueries,
        indexRoute: {
            component: Home,
            queries: ViewerQueries,
        },
        childRoutes: [
          {
            path: 'todos',
            component: TodoApp,
            queries: ViewerQueries,
            indexRoute: {
                component: TodoList,
                queries: ViewerQueries,
                prepareParams: () => ({status: 'any'}),
            },
            childRoutes: [
                {
                    path: ':status',
                    component: TodoList,
                    queries: ViewerQueries,
                },
            ],
          },
          {
            path: 'mui',
            indexRoute: {
                component: TodoList,
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
