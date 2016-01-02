import express from 'express';
import cookieParser from 'cookie-parser';
import graphQLHTTP from 'express-graphql';
import compression from 'compression';
import jwt from 'jwt-simple';
import path from 'path';

import auth from './auth'; // Authentication server
import webapp from '../webapp/server'; // React server
import { schema } from '../graphql/schema'; // Schema for GraphQL server

// Read environment
require( 'dotenv' ).load( );

console.log( '--------------------------------------------------------------------------------' );
console.log( process.env.npm_package_name + ' ' + process.env.npm_package_version + ' running as ' + process.env.NODE_ENV );
console.log( 'Serving at ' + process.env.HOST + ':' + process.env.PORT );
console.log( '--------------------------------------------------------------------------------' );

let router = express( );

router.set( 'trust proxy', 'loopback' );
router.set( 'x-powered-by', false );
router.use( compression( ) );

// TODO Technically the cookie parser is necessary only for GraphQL, and the routing server.
// It is not necessary for serving static content. Consider separating those.
router.use( cookieParser( ) );

// Graphql server
router.use( '/graphql', graphQLHTTP( request => {
  let user_id = 0;
  if( request.cookies.auth_token )
    if( request.cookies.auth_token.length > 10 )
    {
      var decoded = jwt.decode( request.cookies.auth_token, "TBD: Make this a setting tokenSecret" );
      user_id = decoded.user_id;
    }

  return( {
    schema: schema,
    rootValue: { user_id: user_id },
    pretty: true
  } )
} ) );

// Authentication server
router.use( '/auth', auth );

// Static assets server
router.use( express.static( path.resolve( __dirname + '/../public/' ) ) );

// Application with routes
router.use( '/*', webapp );

let server = router.listen( process.env.PORT, process.env.HOST );

export default server;
