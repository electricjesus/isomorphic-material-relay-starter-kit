# Isomorphic Material Relay Starter Kit (IMRSK)

IMRSK started as an off-shoot of multiple projects and boilerplates we use at [Code Foundries](http://codefoundries.com). It is an attempt to provide and organized, well thought out starting point for future projects. It also contains samples of techniques that tie all the underlying technologies together. Baseline functionality like user log in, authentication, etc. is included.

| How to try | **Link**|
|----------------|----------------|
| Live Demo | [http://isomorphic-material-relay.herokuapp.com/](http://isomorphic-material-relay.herokuapp.com/) This is a free dyno, so give it some time to spin up. |
| Run locally | [Local Setup](./doc/Setup-Local.md) |
| Run on [Heroku](https://www.heroku.com/nodejs) | [Heroku Setup](./doc/Setup-Heroku.md) |

Apache Cassandra is not part of this project yet. We are hoping to be able to bring it in soon.

## Underlying technologies

| **Technology** | **Description**|
|----------------|----------------|
| [React](https://facebook.github.io/react/) | Library for building SPA. |
| [Material UI](http://www.material-ui.com/) | Library for implementing Material Design in React. All user interface in this kit is built exclusively with Material UI components. |
| [Relay](https://facebook.github.io/relay/) | A Javascript framework for building data-driven react applications. |
| [GraphQL](https://facebook.github.io/graphql/) | A query language created by Facebook in 2012 for describing the capabilities and requirements of data models for client‐server applications |
| [Express GraphQL](https://github.com/graphql/express-graphql) | A Node.js express library that allows the creation of GraphQL servers |
| [Isomorhic Relay](https://github.com/denvned/isomorphic-relay) | Adds server side rendering support to React Relay. IMRSK fully utilizes this library, while waiting for [https://github.com/facebook/relay/issues/589](https://github.com/facebook/relay/issues/589). The eventual goal is to have full isomorphism with authentication. |
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
| HTTP Only cookies | The HTTP only cookies are currently the safest way to handle authentication in a web application. The JWT tokens are stored in HTTP only cookies making it harder for attackers to access. |
| Material Design | Expanding upon the "card" motifs that debuted in Google Now, Material Design makes more liberal use of grid-based layouts, responsive animations and transitions, padding, and depth effects such as lighting and shadows. |
| Responsive Design | Mainly through the features of the Material UI library, the examples in IMRSK work well on different form factors, ranging from desktop browsers to mobile phones |

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

## More details

* [Local Setup](./doc/Setup-Local.md)
* [Heroku Setup](./doc/Setup-Heroku.md)
* [Building and Running](./doc/BuildRun.md)
* [Important pieces of code](./doc/Code.md)

## Project Structure

Naming conventions are used wherever possible. The following tags are used to comprise names of files:

| Tag                                    | Description                                                    |
| -------------------------------------- | ---------------------------------------------------------------|
| `{Entity}`                             | Name of entity in the data store, like User, ToDo item, etc. |
| `{Mutation}`                           | Indicates type of mutation applied to an entity, like add, delete, update, list_delete, etc. |


| Folder/File                                   | Description                                                    |
| --------------------------------------------- | ---------------------------------------------------------------|
| `data/`                                       | Methods and data access functions |
| `data/da/`                                    | Data access functions |
| `data/da/{Entity}.js`                         | Data access functions for {Entity}. Exported functions are named DA_{Entity}_* |
| `data/model/`                                 | Models |
| `data/model/{Entity}.js`                      | Model for {Entity}. Default class for that entity is exported |
| `doc/`                                        | Misc. documentation |
| `doc/example.env`                             | Example of a `.env` file. Also copied into `\.env` in `setup-local` script |
| `graphql/`                                    | Holds the elements of the GraphQL schema. |
| `graphql/interface/NodeInterface.js`          | The main node interface |
| `graphql/mutations/`                          | All the mutations |
| `graphql/mutations/{Entity}_{Mutation}.js`    | One mutation |
| `graphql/types/`                              | All types, including system types, entity types, connections, etc. |
| `graphql/types/MutationType.js`               | Type that includes all the mutations |
| `graphql/types/QueryType.js`                  | Query type that resolves nodes to entities |
| `graphql/types/ViewerType.js`                 | Current user and entry point for any information retrieved |
| `graphql/types/{Entity}Type.js`               | Type for an entity |
| `graphql/types/*Connection.js`                | Connection between two types |
| `graphql/schema.graphql`                      | Human readable representation of the schema. Not checked into git. Generated by `build-schema` |
| `graphql/schema.js`                           | Entry point for the schema, points at the query type and the mutation type. |
| `graphql/schema.json`                         | Schema in JSON format. Must exist for `build-schema` to run, but is re-generated by it. |

TODO: Describe these too:

* `/public/` - This folder is served as static files at the root of the app. Place all images and static entities not to be processed by webpack here.
* `/public/assets/` - This folder is generated and re-built by webpack build. Do not place any files in this folder.
* `/server/server.js` - Express server for the HTML of the SPA. Serves the HTML, as well as supports isomorphism. If any changes need to be done to the header of the HTML for the SPA, they can be made in this file in the sections [Custom meta tags] and [Custom link tags].
* `/webapp/styles/` - folder for any styles that will be processed by webpack.

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
