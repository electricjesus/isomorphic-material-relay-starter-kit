import App from './components/App';
import Home from './components/Home';
import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';
import ViewerQueries from './queries/ViewerQueries';

/*
*/

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
            path: '/todos',
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
          }
        ],
    },
];
