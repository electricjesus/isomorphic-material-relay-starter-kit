# Isomorphic Material Relay Starter Kit (IMRSK)

IMRSK started as an off-shoot of multiple projects and boilerplates we use at [Code Foundries](http://codefoundries.com). It is an attempt to provide and organize a well thought out starting point for future projects. It also contains samples of techniques that tie all the underlying technologies together. Baseline functionality like user log in, authentication, etc. is included.

| How to try | **Link**|
|----------------|----------------|
| Live Demo | [http://isomorphic-material-relay.herokuapp.com/](http://isomorphic-material-relay.herokuapp.com/) This is a free dyno, so give it some time to spin up. |
| Run locally | [Local Setup](./doc/Setup-Local.md) |
| Run on [Heroku](https://www.heroku.com/nodejs) | [Heroku Setup](./doc/Setup-Heroku.md) |

Apache Cassandra is not part of this project yet. We are hoping to be able to bring it in soon.

# WARNING: We recently changed the user_id s so the auth_token cookies are invalid and will crash the server. Please delete them first.

Naturally the server should be able to figure it out. Coming to a repositoy near you in near future.

## Underlying technologies

| **Technology** | **Description**|
|----------------|----------------|
| [React](https://facebook.github.io/react/) | Library for building SPA. |
| [Material UI](http://www.material-ui.com/) | Library for implementing Material Design in React. All user interface in this kit is built exclusively with Material UI components. |
| [Relay](https://facebook.github.io/relay/) | A Javascript framework for building data-driven react applications. |
| [GraphQL](https://facebook.github.io/graphql/) | A query language created by Facebook in 2012 for describing the capabilities and requirements of data models for client‐server applications. |
| [Express GraphQL](https://github.com/graphql/express-graphql) | A Node.js express library that allows the creation of GraphQL servers. |
| [Isomorphic Relay](https://github.com/denvned/isomorphic-relay) | Adds server side rendering support to React Relay. IMRSK fully utilizes this library, while waiting for [https://github.com/facebook/relay/issues/589](https://github.com/facebook/relay/issues/589). The eventual goal is to have full isomorphism with authentication. |
| [JWT](https://jwt.io/) | JSON Web Tokens is and industry standard [RFC 7519](https://tools.ietf.org/html/rfc7519) method for representing claims securely between two parties. |
| [React Helmet](https://github.com/nfl/react-helmet) | Reusable React component will manage all of your changes to the document head with support for document title, meta, link, script, and base tags. |
| [Babel](http://babeljs.io) | Compiles ES6/ES7 to ES5. Allows using features from ES6 and ES7 today. |
| [Webpack](http://webpack.github.io) | Bundles npm packages and the application Java Script into a single file. Includes hot reloading via [react-transform-hmr](https://www.npmjs.com/package/react-transform-hmr). Also, Webpack can bundle any required CSS. |
| [Node.js](https://nodejs.org)| Event-driven, non-blocking I/O runtime based on JavaScript that is lightweight and efficient. |
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build. |
| [Apache Cassandra](http://cassandra.apache.org/) | The database you are looking for. Not part of the project just yet. |

## Features

| **Feature** | **Details**|
|-------------|------------|
| SPA | The IMRSK is a Single Page Application. It has all the advantages that come with SPA, while using isomorphism and the Relay features allows to offset practically all negatives that come with this approach. |
| Isomorphism | The kit is designed to be fully isomorphic. This allows for very quick rendering when the users first access a page in the application. All content is designed to be accessed in an isomorphic way allowing the use and sharing of links to any part of the SPA. |
| SEO | The combination of isomorphism with the use of the react helmet allows all the content in the application to be SEO ready. Samples will be added to the kit later. |
| ES6, ES7 | The IMRSK uses features of ES6 and ES7 extensively. All rect components are implemented as ES6 classes. |
| JWT Tokens | Currently JWT tokens are used for authentication, although there is an issue related to isomorphism. |
| HTTP Only cookies | The HTTP only cookies are currently the safest way to handle authentication in a web application. The JWT tokens are stored in HTTP only cookies making it harder for attackers to access. Why this is the best place is explained in [Where to Store Your JWTs - Cookies vs HTML5 Web Storage](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage/). |
| Material Design | Expanding upon the "card" motifs that debuted in Google Now, Material Design makes more liberal use of grid-based layouts, responsive animations and transitions, padding, and depth effects such as lighting and shadows. |
| Responsive Design | Mainly through the features of the Material UI library, the examples in IMRSK work well on different form factors, ranging from desktop browsers to mobile phones. |
| Hot Reload | The webpack development server supports hot reload when components are changed. The IMRSK is configured with hot reload. |
| Built for speed | The starter kit is configured to use established practices for optimizing speed like caching and compression. This entails certain requirements about how it is used, read in the Speed and Building section below |

## Setup, building and running

* Quick [Local Setup](./doc/Setup-Local.md)
* Quick [Heroku Setup](./doc/Setup-Heroku.md)
* Detailed [Building and Running](./doc/BuildRun.md) instructions

## Environment Variables

The following environment variables can be used to control the server:

| Variable Name                  | Description                                                    |
| ------------------------------ | ---------------------------------------------------------------|
| PORT                           | Port for serving the SPA web application and API               |
| HOST                           | For for serving                                                |
| JWT_SECRET                     | Secret used for JWT tokens.                                    |
| CASSANDRA_CONNECTION_POINTS    | Cassandra connection point. `localhost` if on the same machine |
| CASSANDRA_KEYSPACE             | Cassandra keyspace/database                                    |

They can be set in the .env file in the root of the project. Example.env in
the documents folder contains an example of such file.

## Project Structure

Naming conventions are used wherever possible. The following tags are used to comprise names of files:

| Tag                                    | Description                                                    |
| -------------------------------------- | ---------------------------------------------------------------|
| `{Entity}`                             | Name of entity in the data store, like User, ToDo item, etc. |
| `{Mutation}`                           | Indicates type of mutation applied to an entity, like add, delete, update, list_delete, etc. |
| `{Version}`                            | Version of the project, as specified in `package.json`, like 0.6.3. |

Below is the list of the main files and folders for this project. Asterisk on the right means link into the repository for quick viewing.

| Folder/File                                   | Description                                                    |  |
| --------------------------------------------- | ---------------------------------------------------------------| --- |
| `data/`                                       | Methods and data access functions | [*](./data/) |
| `data/da/`                                    | Data access functions | [*](./data/da/) |
| `data/da/{Entity}.js`                         | Data access functions for {Entity}. Exported functions are named DA_{Entity}_* |
| `data/model/`                                 | Models | [*](./data/model/) |
| `data/model/{Entity}.js`                      | Model for {Entity}. Default class for that entity is exported |
| `doc/`                                        | Misc. documentation | [*](./doc/) |
| `doc/example.env`                             | Example of a `.env` file. Also copied into `\.env` in `setup-local` script | [*](./doc/example.env) |
| `graphql/`                                    | Holds the elements of the GraphQL schema. | [*](./graphql/) |
| `graphql/interface/NodeInterface.js`          | The main node interface | [*](./graphql/interface/NodeInterface.js) |
| `graphql/mutations/`                          | All the mutations | [*](./graphql/mutations/) |
| `graphql/mutations/{Entity}_{Mutation}.js`    | One mutation |
| `graphql/type/`                               | All types, including system types, entity types, connections, etc. | [*](./graphql/type/) |
| `graphql/type/MutationType.js`                | Type that includes all the mutations | [*](./graphql/type/MutationType.js) |
| `graphql/type/QueryType.js`                   | Query type that resolves nodes to entities | [*](./graphql/type/QueryType.js) |
| `graphql/type/ViewerType.js`                  | Current user and entry point for any information retrieved | [*](./graphql/type/ViewerType.js) |
| `graphql/type/{Entity}Type.js`                | Type for an entity |
| `graphql/types/*Connection.js`                | Connection between two types |
| `graphql/schema.graphql`                      | Human readable representation of the schema. Not checked into git. Generated by `build-schema` |
| `graphql/schema.js`                           | Entry point for the schema, points at the query type and the mutation type. | [*](./graphql/schema.js) |
| `graphql/schema.json`                         | Schema in JSON format. Must exist for `build-schema` to run, but is re-generated by it. | [*](./graphql/schema.json) |
| `public/`                                     | This folder is served as root of the website. | [*](./public/) |
| `public/assets/`                              | Assets generated by webpack |
| `public/assets/{Version}/app.css`             | Not much to see |
| `public/assets/{Version}/app.js`              | All the nice ES5-compliant JavaScript for the SPA |
| `scripts/build-mui-icon-list.js`              | Rebuilds the list of Materual-UI icons. Modify this file to control how many icons are displayed | [*](./scripts/build-mui-icon-list.js) |
| `scripts/build-schema.js`                     | Rebuilds the GraphQL schema files. Must be run when the schema is modified | [*](./scripts/build-schema.js) |
| `server/`                                     | The Node.js server serving isomorphic content, GraphQL, public files and authentication requests | [*](./server/) |
| `server/auth.js`                              | Authentication service, verifies user name and password and creates JWT tokens | [*](./server/auth.js) |
| `server/server.js`                            | Main script | [*](./server/server.js) |

TODO: Describe these too:

* `/webapp/styles/` - folder for any styles that will be processed by webpack.

## Speed and Building

This project configured to use compression on all content, and caching on the static content. This delivers spectacular results. The numbers below were obtained using Google Chrome, development tools throttling and cache disabling, on a 2011 series Macbook Pro. The test is performed on the main page. Instance [deployed on Heroku](http://isomorphic-material-relay.herokuapp.com/) was used.

| Network Speed                  | Initial load (no cache) | Subsequent load (cached content) |
| ------------------------------ | ----------------------- | -------------------------------- |
| On Regular 2G (250 kb/s)       | 7.3 sec                 | 1.4 sec                          |
| On Regular 3G (750 kb/s)       | 3.1 sec                 | 1.1 sec                          |

In both cases the UI becomes visible in less than a second. The wait time is to get all the JavaScript loaded in order to continue working as an SPA.

While this is a desirable level of performance, it is important not to forget that caching the static content means caching the SPA code too. The assets generated with webpack are placed into a sub-folder bearing the version of the package as name. Make sure to increase the version number in `package.json` every time you deploy changes to production.

If you add other static content, you might want to revisit how caching of static content is implemented.

## Credits and Sources

This project serves as a starter kit for projects utilizing the following technologies:

* [React JS](https://facebook.github.io/react/)
* [Relay / GrpahQL](https://facebook.github.io/relay/)
* [Isomorphic Relay](https://github.com/denvned/isomorphic-relay)
* [Material-UI](http://www.material-ui.com/)
* [JSON Web Tokens](https://jwt.io/)
* [Apache Cassandra](http://cassandra.apache.org/).

It contains a boilerplate with several simple code examples. It consists of modified versions of the following projects:

* [Facebook Relay Starter Kit TODO example](https://github.com/facebook/relay/tree/master/examples/todo). Implementation of the TODO MVC using Relay. In this kit the TODO example has been re-implemented with material UI.
* [Isomorphic react-router-relay TODO example](https://github.com/denvned/isomorphic-relay-router/tree/master/examples/todo). The Facebook TODO example in this project has been modified to support isomorphism.
* [Xpepermint's isomorphic-react-relay-boilerplate](https://github.com/xpepermint/isomorphic-react-relay-boilerplate). The project organization was initially borrowed from this project, although it has since diverged.
* [coryhouse's react-slingshot](https://github.com/coryhouse/react-slingshot). Ideas about he documentation are borrowed from this project.
* [ryancole's league](https://github.com/ryancole/league). The organization of the GraphQL schema is borrowed from this project.
* [itayadler's cassandra-paginating-static-columns](https://github.com/itayadler/cassandra-paginating-static-columns/blob/master/index.js). The general approach to working with Cassandra is borrowed from this project, with some changes.

Examples from other open source projects have also been incorporated.

## Final word of caution

This project is not guaranteed to be suitable for production deployment. While we strive to make it as good and bug-free as possible, it is up to you to modify it until it is fit for the purposes of your project.
