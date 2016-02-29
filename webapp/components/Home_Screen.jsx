/* @flow weak */

import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

import {isomorphicVars} from '../scripts/isomorphicVars';

class Home_Screen extends React.Component
{
  render( )
  {
    var isoVars = isomorphicVars( );

    return ( <div>
      <Card>
        <CardHeader
          title="Isomorphic Material-UI Relay starter kit"
          subtitle={ "Version " + isoVars.version }
        />
        <CardText>
          Hello world.
        </CardText>
      </Card>
      <br/>
        <Card>
        <CardHeader
          title="GraphiQL"
          subtitle="Explore the GraphQL server, anonymously. All links open in a new window."
        />
        <CardText>
          <a href="/graphql" target="_blank">GraphiQL browser</a>      
        </CardText>
      </Card>
      <Card>
        <CardHeader
          title="Isomorphic Variables"
          subtitle="Available both for client and server rendering"
        />
        <CardText>
          public_url: { isoVars.public_url }<br/>
          version: { isoVars.version }
        </CardText>
      </Card>
    </div> );
  }
};

export default Relay.createContainer( Home_Screen, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
      }
    `,
  },
});
