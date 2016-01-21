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

    return (
      <Card>
        <CardHeader
          title="Isomorphic Material-UI Relay starter kit"
          subtitle={ "Version " + isoVars.version }
        />
        <CardText>
          The purpose of this project is:
          <ul>
            <li>To server as boilerplate for projects involving react/relay and materual-ui.</li>
            <li>To host examples of using those technologies.</li>
            <li>To implement some common functionality like user authentication using react/relay.</li>
          </ul>
          This project serves as a starter kit for projects utilizing the following technologies:
          <ul>
            <li><a href="https://facebook.github.io/react/">React JS</a></li>
            <li><a href="https://facebook.github.io/relay/">Relay / GrpahQL</a></li>
            <li><a href="https://github.com/denvned/isomorphic-relay">Isomorphic Relay</a></li>
            <li><a href="http://www.material-ui.com/">Material-UI</a></li>
            <li><a href="https://jwt.io/">Java Web Tokens</a></li>
          </ul>
          The project source is <a href="https://github.com/codefoundries/isomorphic-material-relay-starter-kit">available on GitHub</a>.
        </CardText>
      </Card>
    )
  }
};

export default Relay.createContainer( Home_Screen, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ToDo_TotalCount,
      }
    `,
  },
});
