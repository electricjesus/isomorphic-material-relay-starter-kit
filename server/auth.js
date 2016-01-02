import bodyParser from 'body-parser';
import express from 'express';
import jwt from 'jwt-simple';

import {DS_User_getByUserName} from '../data/User';

let auth = express( );
auth.use( bodyParser.json( ) );

auth.post('/', function(req, res, next) {
  console.log( "serving AUTH" );
  console.log( JSON.stringify( req.body ) );
  let username = req.body.username;
  let password = req.body.password;
  console.log( "username=" + username );
  console.log( "password=" + password);

  try
  {
    let user = DS_User_getByUserName( username );

    if ( ! user )
      return res.status( 401 ).json( { error: 'Incorrect user' } );
    else if( ! ( user.password == password ) )
      return res.status( 401 ).json( { error: 'Incorrect password' } );
    else
    {
      // User has authenticated correctly thus we create a JWT token
      var token = jwt.encode( { user_id: user.id }, "TBD: Make this a setting tokenSecret" );

      res.cookie( 'auth_token', token, { httpOnly: true } );
      res.json( { success : true } );
    }
  }
  catch (e)
  {
    return res.status( 401 ).json( { error: 'Error while looking for user' } );
  }
});


export default auth;
