// @flow
"use strict";

import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from "./graphQL";
const app = express();

/**
 * The GraphiQL endpoint
 */
app.use(`/graphiql`, graphqlHTTP(req => ({
      schema: schema,
      graphiql: true
    })
));

/**
 * The single GraphQL Endpoint
 */
app.use('/', graphqlHTTP(req => ({
      schema: schema,
      graphiql: false
    })
));

var server = app.listen(3000, function () {

  var port = server.address().port;
  console.log('App listening at http://localhost:%s', port);
});