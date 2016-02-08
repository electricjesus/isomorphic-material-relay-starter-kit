import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';


class Ensayo_PublicListing extends React.Component
{
  renderEnsayos( )
  {
    return this.props.Viewer.Ensayos.edges.map(edge =>
      <Card key={ edge.node.id }>
        <CardHeader
          title={ edge.node.Ensayo_Title }
          subtitle={ edge.node.Ensayo_Keywords }
        />
        <CardText>
          { edge.node.Ensayo_Content }
        </CardText>
      </Card>
    );
  }

  render( )
  {
    return (
      <div>
        { this.renderEnsayos( ) }
      </div>
    );
  }
}

export default Relay.createContainer( Ensayo_PublicListing, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        Ensayos(first: 2147483647) {
          edges {
            node {
              id,
              Ensayo_Title,
              Ensayo_Keywords,
              Ensayo_Content,
            },
          },
        },
      }
    `,
  },
});
