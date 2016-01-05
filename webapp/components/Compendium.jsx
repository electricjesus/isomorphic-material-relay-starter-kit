import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';

class Compendium extends React.Component
{
  render( )
  {
    return (
      <Card>
        <CardHeader
          title="User Compendium"
          subtitle="One to one properties for a user retrieved from an edge"
        />
        <CardText>
          {
            this.props.viewer.compendiums.edges.map( edge =>
              <div key={ edge.node.id }>
                <TextField
                  ref="Compendium_CompText1"
                  defaultValue={ edge.node.CompText1 }
                  floatingLabelText="When we do a Haiku"
                  fullWidth={ true }
                />
                <TextField
                  ref="Compendium_CompText2"
                  defaultValue={ edge.node.CompText2 }
                  floatingLabelText="The middle has"
                  fullWidth={ true }
                />
                <TextField
                  ref="Compendium_CompText3"
                  defaultValue={ edge.node.CompText3 }
                  floatingLabelText="More than both the beginning and the end"
                  fullWidth={ true }
                />
              </div>
            )
          }
        </CardText>
      </Card>
    );
  }
}

export default Relay.createContainer( Compendium, {
  fragments: {
    viewer: ( ) => Relay.QL`
      fragment on User {
        compendiums( first: 1 ){
          edges {
            node {
              id,
              CompText1,
              CompText2,
              CompText3
            },
          },
        },
      }
    `,
  },
});
