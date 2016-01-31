import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import TextField from 'material-ui/lib/text-field';

import Translaticiarum_addMutation from '../mutations/Translaticiarum_addMutation';


class Translaticiarum_Screen extends React.Component
{
  /*
  _handleAddTranslaticiarum( )
  {
    Relay.Store.commitUpdate(
      new Translaticiarum_addMutation( {
        Translaticiarum_Time: this.refs.addTranslaticiarum.getValue( ),
        Translaticiarum_Type: this.refs.addTranslaticiarum.getValue( ),
        Viewer: this.props.Viewer
      } )
    );

    this.refs.addTranslaticiarum.setValue( '' );
  }
  <div style={ { marginLeft: 4, marginRight: 4, } }>
    <TextField
      ref="addTranslaticiarum"
      floatingLabelText="What needs to be done?"
      fullWidth={ true }
      onEnterKeyDown={ this._handleAddTranslaticiarum.bind( this ) }
    />
  </div>
  */

  render( )
  {
    return (
      <Card initiallyExpanded={true}>

        <CardHeader initiallyExpanded={true} title="Translaticiarum" subtitle="This means routine in Latin" />

        { this.props.children }

        <CardActions initiallyExpanded={true}>
          <FloatingActionButton
						secondary={true}
						linkButton={true}
						mini={true}
						style={ {float: 'right', marginBottom: 15, marginRight: 25 } }
            actAsExpander={true}
          >
            <ContentAdd />
          </FloatingActionButton>
        </CardActions>

      </Card>
    );
  }
}

export default Relay.createContainer( Translaticiarum_Screen, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ${Translaticiarum_addMutation.getFragment('Viewer')},
      }
    `,
  },
});
