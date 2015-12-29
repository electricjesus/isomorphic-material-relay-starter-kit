import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

class Home_Screen extends React.Component
{
  render( )
  {
    return (
      <Card>
        <CardHeader
          title="Isomorphic Material-UI Relay starter kit"
          subtitle="Boilerplate + examples"
        />
        <CardText>
          This project has dual purpose:
          <ul>
            <li>To server as boilerplate for projects involving react/relay and materual-ui.</li>
            <li>To host examples of using those technologies.</li>
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
    viewer: () => Relay.QL`
      fragment on User {
        totalCount,
      }
    `,
  },
});
