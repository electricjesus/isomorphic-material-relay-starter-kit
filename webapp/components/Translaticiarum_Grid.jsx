import React from 'react';
import Dimensions from 'react-dimensions'
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import TextField from 'material-ui/lib/text-field';

import Translaticiarum_addMutation from '../mutations/Translaticiarum_addMutation';
import Translaticiarum_deleteMutation from '../mutations/Translaticiarum_deleteMutation';
import Translaticiarum_updateMutation from '../mutations/Translaticiarum_updateMutation';

import Translaticiarum_Icon from './Translaticiarum_Icon';
import Translaticiarum_Properties from './Translaticiarum_Properties.jsx';

const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

function createDateAsUTC( date )
{
  return new Date( Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ) );
}

//@Dimensions( )
class Translaticiarum_Grid extends React.Component
{
  constructor( props )
  {
    super( props );

    const Date_Start = new Date( );
    Date_Start.setHours( 0 );
    Date_Start.setMinutes( 0 );
    Date_Start.setSeconds( 0 );
    Date_Start.setMilliseconds( 0 );

    this.state = {
      Date_Start: createDateAsUTC( Date_Start ),
    };
  }

  _handle_onChange_Date_Start = ( event, value ) =>
  {
    console.log( "Date:" + value );
    this.setState( {
      Date_Start: createDateAsUTC( value )
    } );
  };

  _handle_updateHandler_Translaticiarum_Add = ( Translaticiarum_properties ) =>
  {
    Relay.Store.commitUpdate(
      new Translaticiarum_addMutation( { ...Translaticiarum_properties, Viewer: this.props.Viewer } )
    );
  };

  _handle_onTouchTap_Add = ( ) =>
  {
    this.refs.Translaticiarum_Properties._handle_Open( );
  };

//   getKeys (obj){
//    var keys = [];
//    for(var key in obj){
//       keys.push(key);
//    }
//    return keys;
// }

  getTranslaticiarumByDateAndType( transliticiarumDays )
  {
    //console.log( this.getKeys( this.props.Viewer.Translaticiarums.edges[ 0 ].node ).join( " " ) );

    const dayCount = transliticiarumDays.length - 1; // First element is null

    // First, organize array with the epoch time for every day beging and end
    // let arrDayBoundaries = [ ];
    // for( let ixDay = 1; ixDay <= dayCount; ixDay++ )
    // {
    //   const epoch = transliticiarumDays[ ixDay ].getTime( );
    //   arrDayBoundaries[ ixDay ] = {
    //     start: epoch,
    //     stop: epoch + 24*60*60*1000,
    //   };
    // }
    //console.log( JSON.stringify( arrDayBoundaries ) );

    // Array with the dates
    const results = { };
    for( let ixDay = 1; ixDay <= dayCount; ixDay++ )
    {
      console.log( "GT:" + transliticiarumDays[ ixDay ].getTime( ) );
      results[ transliticiarumDays[ ixDay ].getTime( ) ] = { };
    }

    console.log( JSON.stringify( results ) );

    this.props.Viewer.Translaticiarums.edges.map( ( edge ) => {

      const Translaticiarum_Date_Epoch = new Date( edge.node.Translaticiarum_Date ).getTime( );
      console.log( "Translaticiarum_Date_Epoch:" + Translaticiarum_Date_Epoch );

      const resultsForDay = results[ Translaticiarum_Date_Epoch ];
      if( resultsForDay != null )
      {
        const type = edge.node.Translaticiarum_Type;
        let arrTranslaticiarum = resultsForDay[ type ];
        if( arrTranslaticiarum == null )
          arrTranslaticiarum = resultsForDay[ type ] = [ ];

        arrTranslaticiarum.push( edge.node )
      }

    } );

    return results;
  }

  renderCell( TranslaticiarumByDateAndType, translaticiarumType, transliticiarumDay )
  {
    let cell;

    // Type 0 does not exist, this indicates that a row should be dates
    if( translaticiarumType == 0 )
    {
      // Blank cell top left
      if( transliticiarumDay == null )
        cell = "";
      else
      {
        // Will display day of week
        cell = dayOfWeek[ transliticiarumDay.getDay( ) ];
      }
    }
    else
    {
      // On the left, the types of translaticiarums
      if( transliticiarumDay == null )
        cell =Translaticiarum_Icon( translaticiarumType );
      else
      {
        cell = "-";
        const TranslaticiarumByType = TranslaticiarumByDateAndType[ transliticiarumDay.getTime( ) ];
        if( TranslaticiarumByType != null )
        {
          const arrTranslaticiarum = TranslaticiarumByType[ translaticiarumType ];
          if( arrTranslaticiarum != null )
          {
            cell = "X";
          }
        }
      }
    }

    return(
      <td key={ transliticiarumDay }>{ cell }</td>
    );
  }

  render( )
  {
    let translaticiarumTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    // Depending on width, determine the number of days shows. Each day is 100 pixels
    let numberOfDays = Math.floor( this.props.containerWidth / 100 );
    if( numberOfDays < 1 ) numberOfDays = 1;
    else if( numberOfDays > 7 ) numberOfDays = 7;

    let transliticiarumDays= [ null ];
    for( let day = 0; day < numberOfDays; day++ )
      transliticiarumDays.push( new Date( this.state.Date_Start.getTime( ) + day * 24*60*60*1000) );

    const TranslaticiarumByDateAndType = this.getTranslaticiarumByDateAndType( transliticiarumDays );

    console.log( "this.state.Date_Start = " + this.state.Date_Start );
    console.log( "this.props.containerWidth = " + this.props.containerWidth );
    console.log( "this.props.containerHeight = " + this.props.containerHeight );

    return (
      <Card initiallyExpanded={true}>

        <CardHeader initiallyExpanded={true} title="Translaticiarum" subtitle="This means routine in Latin" />

        <table>
          <tbody>
            { translaticiarumTypes.map( ( translaticiarumType ) =>
              <tr key={ translaticiarumType }>
                { transliticiarumDays.map( ( transliticiarumDay ) =>
                  this.renderCell( TranslaticiarumByDateAndType, translaticiarumType, transliticiarumDay )
                ) }
              </tr>
            ) }
          </tbody>
        </table>

        <CardActions initiallyExpanded={true}>
          <DatePicker
            hintText="Date Start"
            value={ this.state.Date_Start }
            onChange={ this._handle_onChange_Date_Start }
          />
          <FloatingActionButton
						secondary={true}
						linkButton={true}
						mini={true}
						style={ {float: 'right', marginBottom: 15, marginRight: 15 } }
            actAsExpander={true}
            onTouchTap={ this._handle_onTouchTap_Add }
          >
            <ContentAdd />
          </FloatingActionButton>
        </CardActions>

        <Translaticiarum_Properties
          ref="Translaticiarum_Properties"
          Translaticiarum_Type={ 1 }
          Translaticiarum_Date={ new Date( ).toJSON( ) }
          Translaticiarum_Time={ new Date( ).toJSON( ) }
          updateHandler={ this._handle_updateHandler_Translaticiarum_Add }
        />

      </Card>
    );
  }
}

export default Relay.createContainer( Dimensions( )( Translaticiarum_Grid ), {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        Translaticiarums(first: 2147483647) {
          edges {
            node {
              id,
              Translaticiarum_Date,
              Translaticiarum_Time,
              Translaticiarum_Type,
              ${Translaticiarum_deleteMutation.getFragment('Translaticiarum')},
              ${Translaticiarum_updateMutation.getFragment('Translaticiarum')},
            },
          },
        },
        ${Translaticiarum_addMutation.getFragment('Viewer')},
        ${Translaticiarum_deleteMutation.getFragment('Viewer')},
      }
    `,
  },
});
