# Example Node server with a GraphQL API

[![Build Status](https://travis-ci.org/HiThereCommunity/example-graphql-server.svg?branch=master)](https://travis-ci.org/HiThereCommunity/example-graphql-server)

This repository contains a starter project for creating a [Node.js](https://nodejs.org/en/) server that exposes a [GraphQL](http://graphql.org/) API.


## What's included

- GraphQL API already setup
- Simple development workflow
- Testing suite
- Simple deployment to production

## Getting Started

### Installing dependencies
Install the dependencies by running the following command from the terminal in the directory of the project.

```sh
npm install
```

### Development

Run the server in development using the following command

```sh
npm run start
```

> This will start the node server contained in the folder `/src`.

When running the server in development a file watcher is turned on that performs 3 checks whenever a file contained in the `/src` folder is changed.

1. Restart the server so that any changes are directly loaded
2. Run the linter [standard](http://standardjs.com/).
3. Run [flow](https://flowtype.org/) static type checker. Add `// @flow` at top of any file that you want flow to check.

> The server runs on port 3000 in development

### Production

Start the server in production on **port 80** using the command:

```sh
npm run serve
```
 
> A folder `/dist` will appear. This contains the code on which the production server runs.
> 
> [Forever](https://github.com/foreverjs/forever) is used to run the node server in `/dist` continuously in the background.

In order to stop the server run:

```sh
npm run stop
```

## The GraphQL API

### Writing queries
The graphQL API can be accessed by under the path `/`. The `query` is contained in the query-string
of the request.

```
/?query={hello}
```

### GraphiQL

In addition, you can also use [GraphiQL](https://github.com/graphql/graphiql) for
 writing queries in an IDE environment. GraphiQL can be accessed using the URL path `/graphiql`

 ```
/graphiql
 ```

### Errors in execution of queries

Any errors that occurs during the execution of a graphql query are contained in the response object under the key `"errors"`.

The **structure of the error object differs depending on the environment that the server is run in**: production or development.

#### Errors in development

When running the server in development the error object has 3 properties: 

* `"message"`: An explanation of the error that occurred
* `"stack"`: The stacktrace of the error. This is very useful when debugging!
* `"locations"`: An object that contains the `line` and the `column` associated with the graphql query where the execution error occurred.

```js
{
  "errors": [{
  	"message": string,
  	"stack": [ string ],
  	"locations": [{
  		"line": number,
  		"column": number
  	}]
  }]
}
```

**Example: graphql error in development** 

```js
{
  "errors": [
    {
      "message": "Some error occurred",
      "stack": [
        "Error: Unable to access database",
        "    at resolve (index.js:42:17)",
        "    at resolveOrError (/node_modules/graphql/execution/execute.js:447:12)",
        "    at resolveField (/node_modules/graphql/execution/execute.js:438:16)",
        "    at /node_modules/graphql/execution/execute.js:245:18",
        "    at Array.reduce (native)",
        "    at executeFields (/node_modules/graphql/execution/execute.js:242:42)"
      ],
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ]
    }
  ]
}
```

#### Errors in production

When running the server in production the error object only contains the error `"message"`.

When running the server in production any errors that occur during the execution of the graphql query will be shown in the response error object that is found under the key "errors" in the graphql response.

The array of object for the key `"errors"` contains all the errors that have occurred. 

```js
{
  "errors": [{
    "message": string		
  }]
}
```

**Example: graphql error in production**

```js
{
  "errors":[
    {
       "message": "Some error occurred"
    }
  ]
}
```

## Testing

All the tests are performed using `mocha` and assertions are made using `chai`. Tests are located in folders
under the name `__tests__`.

Note, `mocha` has been setup to import modules contained in the `/resources` directory.


Run the `mocha` tests using the command

```sh
npm run test
```

##Support

This server runs on a linux environment, **windows is not supported**.
