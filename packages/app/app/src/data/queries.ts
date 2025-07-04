import { defineQueries, type QueryKeysOfQueriesObject } from './helpers/_query-types.js'

import { queries as entryQuries } from './scopes/entries.js'

export const queries = defineQueries({
  entries: entryQuries,
})

export type QueryKey = QueryKeysOfQueriesObject<typeof queries>
