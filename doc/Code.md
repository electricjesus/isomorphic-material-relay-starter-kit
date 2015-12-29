# Important pieces of code

* `/public/` - This folder is served as static files at the root of the app. Place all images and static entities not to be processed by webpack here.
* `/public/assets/` - This folder is generated and re-built by webpack build. Do not place any files in this folder.
* `/server/server.js` - Express server for the HTML of the SPA. Serves the HTML, as well as supports isomorphism. If any changes need to be done to the header of the HTML for the SPA, they can be made in this file in the sections [Custom meta tags] and [Custom link tags].
* `/webapp/styles/` - folder for any styles that will be processed by webpack.
