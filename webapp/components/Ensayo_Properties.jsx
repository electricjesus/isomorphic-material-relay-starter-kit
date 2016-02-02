import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import dateFromUTCString from '../scripts/dateFromUTCString'


export default class Ensayo_Properties extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      Dialog_IsOpen: false,
    };
  }

  _handle_Open( )
  {
    this.setState( {
      Dialog_IsOpen: true
    } );
  }

  _handleClose( )
  {
    this.setState( {
      Dialog_IsOpen: false
    } );
  }

  _handleOK( )
  {
    this.props.updateHandler( {
      Ensayo_Content: this.refs.Ensayo_Content.getValue( ),
      Ensayo_Title: this.refs.Ensayo_Title.getValue( ),
      Ensayo_Keywords: this.refs.Ensayo_Keywords.getValue( ),
    } );

    this.setState( {
      Dialog_IsOpen: false
    } );
  }

  render( )
  {
    return(
      <div>
        <Dialog
          open={ this.state.Dialog_IsOpen }
          title="Ensayo"
          actions={ [
            <RaisedButton key="Cancel" label="Cancel" onTouchTap={ this._handleClose.bind( this ) } />,
            <RaisedButton key="OK" label="OK" primary={true} onTouchTap={ this._handleOK.bind( this ) } />,
          ] }
        >
          <TextField
            ref="Ensayo_Title"
            defaultValue={ this.props.Ensayo_Title }
            floatingLabelText="Title"
            fullWidth={ true }
          />
          <TextField
            ref="Ensayo_Keywords"
            defaultValue={ this.props.Ensayo_Keywords }
            floatingLabelText="Keywords"
            fullWidth={ true }
          />
          <TextField
            ref="Ensayo_Content"
            defaultValue={ this.props.Ensayo_Content }
            floatingLabelText="Content"
            fullWidth={ true }
          />
        </Dialog>
      </div>
    );
  }
}
