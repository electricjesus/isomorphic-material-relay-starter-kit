# Isomorphic Material Relay Starter Kit

The purpose of IMRSK is:

* To server as boilerplate for projects involving react/relay and materual-ui.
* To host examples of using those technologies.
* To implement some common functionality like user authentication using react/relay.

Live Demo:

[http://isomorphic-material-relay.herokuapp.com/](http://isomorphic-material-relay.herokuapp.com/)

Running locally:

Perform the steps in **[Local Setup](./doc/Setup-Local.md)**.

The project is already set up to be ran on [Heroku](https://www.heroku.com/nodejs).Follow the **[Heroku Setup](./doc/Setup-Heroku.md)** for directions.

## Underlying technologies

| **Technology** | **Description**|
|----------------|----------------|
| [React](https://facebook.github.io/react/) | Library for building SPA. |
| [Material UI](http://www.material-ui.com/) | Library for implementing Material Design in React. All user interface in this kit is built exclusively with Material UI components. |
| [Relay](https://facebook.github.io/relay/) | A Javascript framework for building data-driven react applications. |
| [GraphQL](https://facebook.github.io/graphql/) | A query language created by Facebook in 2012 for describing the capabilities and requirements of data models for client‐server applications |
| [Express GraphQL](https://github.com/graphql/express-graphql) | A Node.js express library that allows the creation of GraphQL servers |
| [Isomorhic Relay](https://github.com/denvned/isomorphic-relay) | Adds server side rendering support to React Relay. IMRSK fully utilizes this library, while waiting for [https://github.com/facebook/relay/issues/589](https://github.com/facebook/relay/issues/589). The eventual goal is to have full isomorphism with authentication. |
| [JWT](https://jwt.io/) | Java Web Tokens is and industry standard [RFC 7519](https://tools.ietf.org/html/rfc7519) method for representing claims securely between two parties. |
| [React Helmet](https://github.com/nfl/react-helmet) | Reusable React component will manage all of your changes to the document head with support for document title, meta, link, script, and base tags. |
|  [Babel](http://babeljs.io) | Compiles ES6/ES7 to ES5. Allows using features from ES6 and ES7 today. |
| [Webpack](http://webpack.github.io) | Bundles npm packages and the application Java Script into a single file. Includes hot reloading via [react-transform-hmr](https://www.npmjs.com/package/react-transform-hmr). Also, Webpack can bundle any required CSS. |
| [Node.js](https://nodejs.org)| Event-driven, non-blocking I/O runtime based on JavaScript that is lightweight and efficient. |
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build. |

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

## More details

* [Credits and sources](./doc/Credits.md)
* [Local Setup](./doc/Setup-Local.md)
* [Heroku Setup](./doc/Setup-Heroku.md)
* [Environment Variables](./doc/Environment.md)
* [Building and Running](./doc/BuildRun.md)
* [Important pieces of code](./doc/Code.md)

## Final word of caution

This project in its current state is for educational purposes only and is not guaranteed to be suitable for production deployment.
