import React from 'react';
import Relay from 'react-relay';

import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';

import Compendium_updateMutation from '../mutations/Compendium_updateMutation';

class Compendium extends React.Component
{
  _handleUpdate( Compendium )
  {
    console.log( 'Compendium update begin' );
    Relay.Store.update(
      new Compendium_updateMutation( {
        Compendium: Compendium,
        CompText1: this.refs.CompText1.getValue( ),
        CompText2: this.refs.CompText2.getValue( ),
        CompText3: this.refs.CompText3.getValue( ),
      } )
    );
    console.log( 'Compendium update end' );
  }

  render( )
  {
    return (
      <div>
        {
          this.props.viewer.compendiums.edges.map( edge => (
            <Card key={ edge.node.id }>
              <CardHeader
                title="User Compendium"
                subtitle="One to one properties for a user retrieved from an edge"
              />
              <CardText>
                  <TextField
                    ref="CompText1"
                    defaultValue={ edge.node.CompText1 }
                    floatingLabelText="When we do a Haiku"
                    fullWidth={ true }
                  />
                  <TextField
                    ref="CompText2"
                    defaultValue={ edge.node.CompText2 }
                    floatingLabelText="The middle has"
                    fullWidth={ true }
                  />
                  <TextField
                    ref="CompText3"
                    defaultValue={ edge.node.CompText3 }
                    floatingLabelText="More than both the beginning and the end"
                    fullWidth={ true }
                  />
                <div>
                  <RaisedButton
                    label="Update"
                    secondary={true}
                    onTouchTap={ ( ) => this._handleUpdate( edge.node ) }
                  />
                </div>
              </CardText>
            </Card>
          ) )
        }
      </div>
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
              ${Compendium_updateMutation.getFragment('Compendium')},
            },
          },
        },
      }
    `,
  },
});
