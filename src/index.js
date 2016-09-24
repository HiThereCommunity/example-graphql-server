// @flow
/**
 * Copyright (c) 2016, Dirk-Jan Rutten
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'babel-polyfill'

import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './graphQL'
const app = express()
import { GraphQLError } from 'graphql/error'

const environment = process.env.NODE_ENV

var port: number
var errorFormatter

switch (environment) {
  case 'production':
    port = 80
    errorFormatter = (error: GraphQLError) => ({
      message: error.message
    })
    break
  case 'development':
    port = 3000
    errorFormatter = (error: GraphQLError) => ({
      message: error.message,
      stack: error.stack.split('\n'),
      locations: error.locations
    })
    break
  default:

    if (environment == null) throw new Error(`No environment has been specified, set one using NODE_ENV and set it equal to 'production' or 'development'`)
    else throw new Error(`Unrecognized environment ${environment}`)
}

/**
 * The GraphiQL endpoint
 */
app.use(`/graphiql`, graphqlHTTP(req => ({
  schema: schema,
  graphiql: true,
  formatError: errorFormatter
})
))

/**
 * The GraphQL Endpoint
 */
app.use('/', graphqlHTTP(req => ({
  schema: schema,
  graphiql: false,
  pretty: environment !== 'production',
  formatError: errorFormatter
})
))

app.listen(port, function () {
  console.log(`Server running on port ${port}`)
})
