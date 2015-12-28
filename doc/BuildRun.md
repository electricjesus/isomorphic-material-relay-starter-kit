# Building and Running

## Schema changes

Whenever you change the schema, regenerate in the following way:

* Run: `npm run schema-update`.

## Running in development mode

Two separate servers need to be started. The first one is the actual application in development mode. The second server is the webpack server which is to be run at all times for hot replace

* Start application HTTP server: `npm run start-dev`.
* Start application Webpack server: `npm run webpack-start`.

If you are running this on Mac, you would use two separate terminal windows and leave both servers running. To open the app:

* Navigate to `http://localhost:4444`, unless you specified a different port.

## Building for production

Every time you change the application and want to make it ready to run in production, you need to perform this step:

* Run `npm run webpack-build`.

## Running in production

* Run `npm run start`
* Navigate to `http://localhost:4444`, unless you specified a different port.
