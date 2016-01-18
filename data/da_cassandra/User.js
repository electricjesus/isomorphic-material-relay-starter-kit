import { sql, runQueryOneResult } from './_client.js';
import User from '../model/User'

const User_0 = new User( { id: '00000000-0000-0000-0000-000000000000', username: '', password: '', displayName: 'Anonymous', email: '' } );

export function DA_User_getByUserName( username )
{
  const query = sql.select( )
    .from( '"User"' )
    .where( 'username=?', username )
    .toParam( )
  ;

  return runQueryOneResult( User, query.text, query.values );
}

export function DA_User_get( id )
{
  // Anonymous user is not even recorded in the database
  if( id === '00000000-0000-0000-0000-000000000000' )
  {
    return new Promise( ( resolve, reject ) =>
      resolve( User_0 )
    );
  }
  else
  {
    const query = sql.select( )
      .from( '"User"' )
      .where( 'id=?', id )
      .toParam( )
    ;
    return runQueryOneResult( User, query.text, query.values );
  }
}
