import React from 'react';
import Relay from 'react-relay';

class MUI_List extends React.Component
{
  render( )
  {
    return (
      <div>
        MUI Home
      </div>
    )
  }
};


MUI_List.contextTypes = {
    history: React.PropTypes.object
};


export default Relay.createContainer(MUI_List, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        totalCount,
      }
    `,
  },
});
