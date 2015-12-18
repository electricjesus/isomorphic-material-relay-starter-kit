import 'babel/polyfill';
//import {createBrowserHistory} from 'history';
let history = require('history');
import {IndexRoute, Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {RelayRouter} from 'react-router-relay';

import App from './components/App';
import Home from './components/Home';
import MUI_Icons from './components/MUI_Icons';
import MUI_Home from './components/MUI_Home';
import TodoApp from './components/TodoApp';
import TodoList from './components/TodoList';
import ViewerQueries from './queries/ViewerQueries';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin( );

import './styles/main.css';

ReactDOM.render(
  <RelayRouter history={history.createHistory( )}>
    <Route path="/" component={ App } queries={ ViewerQueries }>
      <IndexRoute component={ Home } queries={ViewerQueries}/>
      <Route path="todos" component={TodoApp} queries={ViewerQueries}>
        <IndexRoute component={TodoList} queries={ViewerQueries} prepareParams={() => ({status: 'any'})}/>
        <Route path=":status" component={TodoList} queries={ViewerQueries}/>
      </Route>
      <Route path="mui">
        <IndexRoute component={MUI_Home} queries={ViewerQueries}/>
        <Route path="icons" component={MUI_Icons} queries={ViewerQueries}/>
      </Route>
    </Route>
  </RelayRouter>,
  document.getElementById('root')
);
