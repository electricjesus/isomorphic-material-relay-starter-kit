# Code Foundries' Isomorphic Material Relay Starter Kit

This project serves as a starter kit for projects utilizing the following technologies:

* [React JS](https://facebook.github.io/react/)
* [Relay / GrpahQL](https://facebook.github.io/relay/)
* [Isomorphic Relay](https://github.com/denvned/isomorphic-relay)
* [Material-UI](http://www.material-ui.com/)

It contains a boilerplate with several simple code examples. It consists of modified versions of the following projects:

* [Facebook Relay Starter Kit TODO example](https://github.com/facebook/relay/tree/master/examples/todo). Implementation of the TODO MVC using Relay.
* [Isomorphic react-router-relay TODO example](https://github.com/denvned/isomorphic-relay-router/tree/master/examples/todo). The Facebook TODO example in this project has been modified to support isomorphism.
* [Xpepermint's isomorphic-react-relay-boilerplate](https://github.com/xpepermint/isomorphic-react-relay-boilerplate). The project organization is largely borrowed from this project.

Examples from other projects have also been incorporated.

# Initial setup

* Clone from git using `git clone https://github.com/codefoundries/isomorphic-material-relay-starter-kit`.
* Install node modules with `npm install`.
* Update the schema by running `npm run schema-update`.
* Build the webpack for the first time with `npm run webpack-build`.
* Set the permissions on `run80.sh` with `chmod +x ./run80.sh`.

# Schema changes

Whenever you change the schema, regenerate in the folowing way:

* Run: `npm run schema-update`.

# Running in development mode

Two separate servers need to be started. The first one is the actual application in development mode. The second server is the webpack server which is to be run at all times for hot replace

* Start application HTTP server: `npm run start-dev`.
* Start application Webpack server: `npm run webpack-start`.

If you are running this on Mac, you would use two separate terminal windows and leave both servers running. To open the app:

* Navigate to `http://localhost:4444`, unless you specified a different port.

# Building

Every time you change the application and want to make it ready to run in production, you need to perform this step:

* Run `npm run webpack-build`.

# Running in production

* Run `npm run start-prod`
* Navigate to `http://localhost:4444`, unless you specified a different port.

# Configuration using environment variables

## Changing server port

* Before starting the app server, use `export NODE_PORT=5555`. In this example we set the port to 5555.

## Changing server host name

* Before starting the app server, use `export NODE_HOST="mydomain.com"`. In this example we set the host to mydomain.com.

## Running locally on port 80 - NOT for production setup

This is just a simplified shortcut for development purposes.

* As a preparation step that needs to be run only once run `chmod +x ./run80.sh`
* Run `sudo -s ./run80.sh`.
* Start application Webpack server: `npm run webpack-start`.
* Navigate to `http://localhost`.

You can also create your own runXX.sh files

# Important pieces of code

* `/public/` - This folder is served as static files at the root of the app. Place all images and static entities not to be processed by webpack here.
* `/public/assets/` - This folder is generated and re-built by webpack build. Do not place any files in this folder.
* `/server/server.js` - Express server for the HTML of the SPA. Serves the HTML, as well as supports isomorphism. If any changes need to be done to the header of the HTML for the SPA, they can be made in this file in the sections [Custom meta tags] and [Custom link tags].
* `/webapp/styles/` - folder for any styles that will be processed by webpack.
