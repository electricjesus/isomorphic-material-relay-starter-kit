import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import TextField from 'material-ui/lib/text-field';

import Translaticiarum_addMutation from '../mutations/Translaticiarum_addMutation';

import Translaticiarum_Properties from './Translaticiarum_Properties.jsx';


class Translaticiarum_Grid extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      Date_Start: new Date( ),
    };
  }

  _handle_onChange_Date_Start = ( event, value ) =>
  {
    this.setState( {
      Date_Start: value
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

  render( )
  {
    let translaticiarumTypes = [0, 1, 2, 3, 4, 5, 6, 7];
    let transliticiarumDays= [null, new Date(Date.now() + 1 * 24*60*60*1000), new Date(Date.now() + 2 * 24*60*60*1000) ];

    return (
      <Card initiallyExpanded={true}>

        <CardHeader initiallyExpanded={true} title="Translaticiarum" subtitle="This means routine in Latin" />

        <DatePicker
          hintText="Date Start"
          value={ this.state.Date_Start }
          onChange={ this._handle_onChange_Date_Start }
        />

        <table>
          <tbody>
            { translaticiarumTypes.map( ( translaticiarumType, ix1 ) =>
              <tr key={ ix1 }>
                { translaticiarumTypes.map( ( translaticiarumType, ix2 ) =>
                  <td key={ ix2 }>x</td>
                ) }
              </tr>
            ) }
          </tbody>
        </table>

        <CardActions initiallyExpanded={true}>
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

export default Relay.createContainer( Translaticiarum_Grid, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ${Translaticiarum_addMutation.getFragment('Viewer')},
      }
    `,
  },
});
