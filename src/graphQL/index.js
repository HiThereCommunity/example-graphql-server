// @flow
/**
 * Copyright (c) 2016, Dirk-Jan Rutten
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
} from 'graphql';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Queries',
        description: "All the queries that can be used to retrieve data",
        fields: () => ({
            hello: {
                type: GraphQLString,
                description: "Hello, world",
                resolve: (): ?string => "hello, world"
            }
        })
    })
});