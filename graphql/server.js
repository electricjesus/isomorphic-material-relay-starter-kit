import chalk from 'chalk';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import jwt from 'jwt-simple';

import schema from './schema'; // Schema for GraphQL server

let router = express( );

router.use( '/', ( req, res, next ) =>
{
  let user_id = '00000000-0000-0000-0000-000000000000'; // Anonymous
  try
  {
    if( req.cookies.auth_token )
      if( req.cookies.auth_token.length > 10 )
      {
        var decoded = jwt.decode( req.cookies.auth_token, process.env.JWT_SECRET );
        user_id = decoded.user_id;
      }
  }
  catch( err )
  {
    console.log( chalk.bold.red( "Failure while decoding JWT token, using anonymous instead." ) );
    console.log( chalk.red( err.message ) );
    console.log( chalk.blue( '.' ) );
  }

  graphQLHTTP( request => {
    return( {
      schema: schema,
      rootValue: { user_id: user_id },
      pretty: true
    } )
  } )( req, res, next );
} );

export default router;
