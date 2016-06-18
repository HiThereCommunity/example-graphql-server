/**
 * Created by Dirk-Jan Rutten on 18/06/16.
 */

import {
    graphql,
    GraphQLObjectType,
    GraphQLSchema,
} from 'graphql';

import {expect} from "chai";
import schema from "./../index";

describe("Test the schema", ()=>{

    it("Should return hello, world", async ()=>{
        return expect(
            await graphql(schema, "{ hello }")
        ).to.deep.equal({
            data: {
                hello: "hello, world"
            }
        });
    });
});