import IsomorphicRouter from 'isomorphic-relay-router';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Relay from 'react-relay';
import RelayStoreData from 'react-relay/lib/RelayStoreData';
import {match, RoutingContext} from 'react-router';

import routes from './routes';

// Read environment
require( 'dotenv' ).load( );

let port = require( '../package.json' )
const GRAPHQL_URL = `http://localhost:${process.env.PORT}/graphql`;

Relay.injectNetworkLayer( new Relay.DefaultNetworkLayer( GRAPHQL_URL ) );
RelayStoreData.getDefaultInstance( ).getChangeEmitter( ).injectBatchingStrategy(() => { } );

export default ( req, res, next, assetsPath ) => {
    match({routes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
        if (error) {
            next(error);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            IsomorphicRouter.prepareData(renderProps).then(render, next);
        } else {
            res.status(404).send('Not Found');
        }

        function render(data) {
          // TODO HACK This is a total hack and shod be fixed somehow.
          GLOBAL.navigator = { userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36"};
            const reactOutput = ReactDOMServer.renderToString(
                <IsomorphicRouter.RoutingContext {...renderProps} />
            );
            res.render(path.resolve(__dirname, '..', 'webapp/views', 'index.ejs'), {
                preloadedData: JSON.stringify(data),
                assetsPath: assetsPath,
                reactOutput
            });
        }
    });
};
