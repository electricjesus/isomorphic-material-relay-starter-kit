/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import fetch from 'isomorphic-fetch';
import {buildClientSchema} from 'graphql/'

// If enabled, code mirror will scream for navigator upon server rendering
//import GraphiQL from 'graphiql';

function graphQLFetcher(graphQLParams) {
  console.log(graphQLParams);
  var paramString = JSON.stringify(graphQLParams);
  var posSubscription = paramString.indexOf('subscriptionType { name }')

  if(posSubscription > -1){
    paramString = paramString.substr(0,posSubscription) + paramString.substr(posSubscription + 27)
  }

  graphQLParams = JSON.parse(paramString);

  return fetch('https://localhost:4444/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body:  graphQLParams.query

  })
  .then(response => response.json())
}

class GraphiQLBrowser extends React.Component
{
  render( )
  {
    // Do not allow server rendering - code mirror wants navigator and will crash node if it does not get it
    // if( navigator )
    //   return ( <GraphiQL fetcher={graphQLFetcher} /> );
    // else
      return <div>Not implemented, see <a href="https://github.com/codefoundries/isomorphic-material-relay-starter-kit/issues/82">Issue 82</a></div>;
  }
};

export default Relay.createContainer( GraphiQLBrowser, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
      }
    `,
  },
});
