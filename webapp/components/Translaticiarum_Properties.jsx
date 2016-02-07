import React from 'react';

import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import TimePicker from 'material-ui/lib/time-picker/time-picker';

import dateFromUTCString from '../scripts/dateFromUTCString'


// function createDateAsUTC( date )
// {
//   return new Date( Date.UTC(
//     date.getFullYear(),
//     date.getMonth(),
//     date.getDate(),
//     date.getHours(),
//     date.getMinutes(),
//     date.getSeconds(),
//     date.getMilliseconds()
//   ) );
// }

// function createDateAsLocal( date )
// {
//   const d = new Date( );
//
//   d.setYear( date.getUTCFullYear( ) );
//   d.setMonth( date.getUTCMonth( ) );
//   d.setDate( date.getUTCDate( ) );
//   d.setHours( date.getUTCHours( ) );
//   d.setMinutes( date.getUTCMinutes( ) );
//   d.setSeconds( date.getUTCSeconds( ) );
//   d.setMilliseconds( date.getUTCMilliseconds( ) );
//
//   return d;
// }


const TimeZoneOffset = new Date( 1970, 0, 1 ).getTime( );

function convertUTCToLocal( date )
{
  return new Date( date.getTime( ) + TimeZoneOffset );
}

function convertLocalToUTC( date )
{
  return new Date( date.getTime( ) - TimeZoneOffset );
}


export default class Translaticiarum_Properties extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      Dialog_IsOpen: false,
      Translaticiarum_Date: convertUTCToLocal( dateFromUTCString( props.Translaticiarum_Date ) ),
      Translaticiarum_Time: convertUTCToLocal( dateFromUTCString( props.Translaticiarum_Time ) ),
    };

    console.log( "Translaticiarum_Properties ----" );
    console.log( "props.Translaticiarum_Date:" + props.Translaticiarum_Date );
    console.log( "this.state.Translaticiarum_Date:" + this.state.Translaticiarum_Date );
    console.log( "props.Translaticiarum_Time:" + props.Translaticiarum_Time );
    console.log( "this.state.Translaticiarum_Time:" + this.state.Translaticiarum_Time );
  }

  _handle_Open( )
  {
    this.setState( {
      Dialog_IsOpen: true
    } );
  }

  _handle_onChange_Translaticiarum_Date = ( event, value ) =>
  {
    this.setState( {
      Translaticiarum_Date: value
    } );
  };

  _handle_onChange_Translaticiarum_Time = ( event, value ) =>
  {
    this.setState( {
      Translaticiarum_Time: value
    } );
  };

  _handle_onTouchTap_Close = ( ) =>
  {
    this.setState( {
      Dialog_IsOpen: false
    } );
  };

  _handle_onTouchTap_OK = ( ) =>
  {
    let theTime = this.state.Translaticiarum_Time;
    theTime.setYear( 1970 );
    theTime.setMonth( 0 );
    theTime.setDate( 1 );

    this.props.updateHandler( {
      Translaticiarum_Type: this.refs.Translaticiarum_Type.getValue( ),
      Translaticiarum_Date: convertLocalToUTC( this.state.Translaticiarum_Date ).toJSON( ),
      Translaticiarum_Time: convertLocalToUTC( theTime ).toJSON( ),
    } );

    this.setState( {
      Dialog_IsOpen: false
    } );
  };

  render( )
  {
    return(
      <div>
        <Dialog
          open={ this.state.Dialog_IsOpen }
          title="Translaticiarum"
          actions={ [
            <RaisedButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_Close } />,
            <RaisedButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_OK } />,
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
            value={ this.state.Translaticiarum_Date }
            onChange={ this._handle_onChange_Translaticiarum_Date }
          />
          <TimePicker
            hintText="Time"
            defaultTime={ this.state.Translaticiarum_Time }
            onChange={ this._handle_onChange_Translaticiarum_Time }
          />
        </Dialog>
      </div>
    );
  }
}
