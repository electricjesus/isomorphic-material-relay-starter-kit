/* @flow */

import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SelectField from 'material-ui/lib/select-field';
import TextField from 'material-ui/lib/text-field';


class User_Properties extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      User_ProfilePhoto: this.props.Viewer.User_ProfilePhoto,
    };
  }

  _handle_onChange_User_ProfilePhoto = ( event, index, value ) =>
  {
    this.setState( {
      User_ProfilePhoto: value
    } );
  };

  render( )
  {
    if( this.props.Viewer.User_IsAnonymous )
      return <div/>; // Anonymous users do not get to have a profile
    else
      return (
        <Card>
          <CardHeader
            title="User profile"
          />
          <CardText>
            <TextField
              ref="User_DisplayName"
              defaultValue={ this.props.Viewer.User_DisplayName }
              floatingLabelText="Display Name"
              fullWidth={ true }
            />
            <TextField
              ref="User_Email"
              defaultValue={ this.props.Viewer.User_Email }
              floatingLabelText="Email"
              fullWidth={ true }
            />
            <SelectField
              value={ this.state.User_ProfilePhoto }
              floatingLabelText="Which one is your favorite water mammal?"
              onChange={ this._handle_onChange_User_ProfilePhoto }
              fullWidth={ true }
            >
              <MenuItem value={ "/profile_photos/griz.jpg" }   primaryText="Griz"/>
              <MenuItem value={ "/profile_photos/grumpy.jpg" } primaryText="Grumpy"/>
              <MenuItem value={ "/profile_photos/ice.jpg" }    primaryText="Ice"/>
              <MenuItem value={ "/profile_photos/jack.jpg" }   primaryText="Jack"/>
              <MenuItem value={ "/profile_photos/jill.jpg" }   primaryText="Jill"/>
              <MenuItem value={ "/profile_photos/panda.jpg" }  primaryText="Panda"/>
            </SelectField>
            <img src={ this.state.User_ProfilePhoto }/>
          </CardText>
        </Card>
      );
  }
}

export default Relay.createContainer( User_Properties, {
  fragments: {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer{
        User_IsAnonymous,
        User_DisplayName,
        User_ProfilePhoto,
        User_Email,
        User_Locale,
      }
    `,
  }
} );
