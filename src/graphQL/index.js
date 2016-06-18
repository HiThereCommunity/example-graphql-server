/**
 * Created by Dirk-Jan Rutten on 18/06/16.
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
                resolve: () => "hello, world"
            }
        })
    })
});