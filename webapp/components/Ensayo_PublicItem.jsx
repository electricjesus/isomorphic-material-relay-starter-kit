import Helmet from "react-helmet";
import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

class Ensayo_PublicItem extends React.Component
{
  render( )
  {
    return (
      <div>
        <Helmet
          title={ this.props.Viewer.Ensayo.Ensayo_Title }
          meta={ [
            { name: "description", content: this.props.Viewer.Ensayo.Ensayo_Keywords },
          ] }
        />
        <Card>
          <CardHeader
            title={ this.props.Viewer.Ensayo.Ensayo_Title }
            subtitle={ this.props.Viewer.Ensayo.Ensayo_Keywords }
          />
          <CardText>
            { this.props.Viewer.Ensayo.Ensayo_Content }
          </CardText>
        </Card>
      </div>
    );
  }
};

export default Relay.createContainer( Ensayo_PublicItem, {

  initialVariables:
  {
    id: null,
  },

  prepareVariables( { id } )
  {
    return { id, };
  },

  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        Ensayo(id:$id){
          id,
          Ensayo_Title,
          Ensayo_Keywords,
          Ensayo_Content,
        }
        User_IsAnonymous,
      }
    `,
  },
});
