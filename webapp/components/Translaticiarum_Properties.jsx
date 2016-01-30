import React from 'react';


import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import TimePicker from 'material-ui/lib/time-picker/time-picker';

export default class Translaticiarum_Properties extends React.Component
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
          title="Translaticiarum"
          actions={ [
            <RaisedButton key="Cancel" label="Cancel" onTouchTap={ this._handleClose.bind( this ) } />,
            <RaisedButton key="OK" label="OK" primary={true} onTouchTap={ this._handleOK.bind( this ) } />,
          ] }
        >
          <TextField
            ref="Translaticiarum_Type"
            defaultValue={ this.props.Translaticiarum_Type }
            floatingLabelText="Type"
            fullWidth={ true }
          />
          <DatePicker
            hintText="Date"
            defaultValue={ new Date( this.props.Translaticiarum_Date ).toLocaleDateString( 'en-US' ) }
          />
          <TimePicker
            hintText="Time"
            defaultValue={ new Date( this.props.Translaticiarum_Time ).toLocaleTimeString( 'en-US' ) }
          />
        </Dialog>
      </div>
    );
  }
}
