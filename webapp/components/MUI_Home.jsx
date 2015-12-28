import React from 'react';
import Relay from 'react-relay';

class MUI_Home extends React.Component
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

export default Relay.createContainer( MUI_Home, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        totalCount,
      }
    `,
  },
});
