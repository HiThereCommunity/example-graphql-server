/**
 * Copyright (c) 2016, Dirk-Jan Rutten
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    graphql
} from 'graphql'
import {expect} from 'chai'
import { describe, it } from 'mocha'

import schema from './../index'

describe('Test the schema', () => {
  it('The `hello` query should return `hello, world`', async () => {
    return expect(
            await graphql(schema, '{ hello }')
        ).to.deep.equal({
          data: {
            hello: 'hello, world'
          }
        })
  })
})
