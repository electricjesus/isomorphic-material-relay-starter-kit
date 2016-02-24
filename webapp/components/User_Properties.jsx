/* @flow */

import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';


class User_Properties extends React.Component
{
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
