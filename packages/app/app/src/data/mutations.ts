import { defineMutations } from './helpers/_mutation-types.js'

import { mutations as entryMutations } from './scopes/entries.js'

export const mutations = defineMutations({
  entries: entryMutations,
})
