//import {createBrowserHistory} from 'history';
let history = require('history');
import {IndexRoute, Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import {RelayRouter} from 'react-router-relay';

import Chrome from './components/Chrome.jsx';
import Home_Screen from './components/Home_Screen.jsx';
import MUI_Icons from './components/MUI_Icons.jsx';
import MUI_Home from './components/MUI_Home.jsx';
import ToDo_Screen from './components/ToDo_Screen.jsx';
import ToDo_List from './components/ToDo_List.jsx';
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
    <Route path="/" component={ Chrome } queries={ ViewerQueries }>
      <IndexRoute component={ Home_Screen } queries={ViewerQueries}/>
      <Route path="todos" component={ ToDo_Screen } queries={ViewerQueries}>
        <IndexRoute component={ToDo_List} queries={ViewerQueries} prepareParams={() => ({status: 'any'})}/>
        <Route path=":status" component={ToDo_List} queries={ViewerQueries}/>
      </Route>
      <Route path="mui">
        <IndexRoute component={MUI_Home} queries={ViewerQueries}/>
        <Route path="icons" component={MUI_Icons} queries={ViewerQueries}/>
      </Route>
    </Route>
  </RelayRouter>,
  document.getElementById('root')
);
