import bodyParser from 'body-parser';
import express from 'express';
import jwt from 'jwt-simple';

import {
  DS_User_getByUserName
} from '../data/User';

// Read environment
require( 'dotenv' ).load( );


let auth = express( );
auth.use( bodyParser.json( ) );

auth.post('/', function(req, res, next)
{
  let username = req.body.username;
  let password = req.body.password;

  try
  {
    let user = DS_User_getByUserName( username );

    if ( ! user )
      return res.status( 401 ).json( { error: 'Incorrect user' } );
    // Quite naturally this is not how it should be done in production. Never store your passwords in
    // clear text. Use something like bcrypt. Resources:
    //   http://arstechnica.com/security/2012/08/passwords-under-assault/
    //   https://www.npmjs.com/package/bcrypt
    // TODO Create a method in the DS which checks for user's password, this would be a better
    // level of abstraction.
    else if( ! ( user.password == password ) )
      return res.status( 401 ).json( { error: 'Incorrect password' } );
    else
    {
      // User has authenticated correctly thus we create a JWT token
      var token = jwt.encode( { user_id: user.id }, process.env.JWT_SECRET );

      res.cookie( 'auth_token', token, { httpOnly: true } );
      res.json( { success : true } );
    }
  }
  catch (e)
  {
    return res.status( 401 ).json( { error: 'Error while looking for user' } );
  }
} );


export default auth;
