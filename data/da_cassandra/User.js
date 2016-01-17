import { sql, runQueryOneResult } from './_client.js';
import User from '../model/User'

const User_0 = new User( { id: 0, username: '', password: '', displayname: 'Anonymous', email: '' } );

export function DA_User_getByUserName( username )
{
  const query = sql.select( )
    .from( 'User' )
    .where( 'username=?', username )
    .toParam( )
  ;

  return runQueryOneResult( User, query.text, query.values );
}

export function DA_User_get( id )
{
  if( id == 0 )
  {
    return new Promise( ( resolve, reject ) =>
      resolve( User_0 )
    );
  }
  else
  {
    const query = sql.select( )
      .from( 'User' )
      .where( 'id=?', id )
      .toParam( )
    ;
    return runQueryOneResult( User, query.text, query.values );
  }
}
