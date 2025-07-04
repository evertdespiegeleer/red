import { createClient } from 'redis'
import { getConfig } from './config/config.js'
import { ConnectionString } from 'connection-string'

let connectionString: string | undefined
const config = getConfig()
if ('connectionString' in config.redis) {
    connectionString = config.redis.connectionString
} else {
    const { host, port, user, password, db, tls } = config.redis
    const cs = new ConnectionString()
    cs.setDefaults({
        protocol: tls ? 'rediss' : 'redis',
        hosts: [{
            name: host,
            port: port,
        }],
        user,
        password,
        path: [db]
    })
    connectionString = cs.toString()
}

let redisClient: Awaited<ReturnType<typeof createClient>> | undefined

export const connectRedis = async () => {
    redisClient = await createClient({
        url: connectionString,
    }).connect()
}

export const getRedisClient = () => {
    if (redisClient == null) {
        throw new Error('Redis client is not connected. Call connectRedis() first.')
    }
    return redisClient
}