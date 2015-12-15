import path from 'path';
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import Helmet from 'react-helmet';
import {RoutingContext, match} from 'react-router';

//import routes from './routes';
import renderOnServer from './renderOnServer'

const env = process.env;

let assetsPath;
if( process.env.NODE_ENV == 'production' )
  assetsPath = `/assets/${env.npm_package_version}`;
else
  assetsPath = `${env.npm_package_config_appWebpackBaseUrl}/${env.npm_package_version}`;

let app = express();

// Serve HTML
app.get( '/*', ( req, res, next ) => {
    renderOnServer( req, res, next, assetsPath );
} );

export default app;
