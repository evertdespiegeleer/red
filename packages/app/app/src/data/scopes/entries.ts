import { getRedisClient } from '../../redis.js'
import { defineMutations } from '../helpers/_mutation-types.js'
import { defineQueries } from '../helpers/_query-types.js'

export const queries = defineQueries({
  keys: {
    queryKey: ['entries', 'keys'],
    queryFn: () => {
        return getRedisClient().keys('*')
    },
  },
})

export const mutations = defineMutations({
})
