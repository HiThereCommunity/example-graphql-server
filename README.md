# Example Node server with a GraphQL API

This repository contains an example of a [Node.js](https://nodejs.org/en/) server
that exposes a [GraphQL](http://graphql.org/) API.

## What's included

- GraphQL API already setup
- Simple development workflow
- Testing suite
- Command for deploying to production

## Getting Started

### Installing dependencies
Install the dependencies by running the following command from the terminal in the directory of the project.

```
$ npm install
```

### Development

Run the server in development using the following command

```
$ npm run start
```

When running the node server in development [Nodemon](https://github.com/remy/nodemon) will be turned on.
Nodemon will watch for any file changes in the project and automatically restart the server.

### Production

In production we precompile all the files in the `/src` directory to ES5 syntax using `babel`. These precompiled files are then moved to the `/dist` folder. Precompile the files using the following command

```
$ npm run build
```

To run the precompiled assets in production run the command

```
$ npm run serve
```

### Testing

All the tests are performed using `mocha` and assertions are made using `chai`. Tests are located in folders
under the name `__tests__`.

Run the tests using the command

```
$ npm run test
```

Mocha imports any modules contained in the `/resources` directory.

## The GraphQL API


### Writing queries
The graphQL API can be accessed by under the path `/`. The `query` is contained in the query-string
of the request.

```
http://localhost:3000/?query={hello}
```

### GraphiQL

In addition, you can also use [GraphiQL](https://github.com/graphql/graphiql) for
 writing queries in an IDE environment. GraphiQL can be accessed using the URL path `/graphiql`

 ```
http://localhost:3000/graphiql
 ```