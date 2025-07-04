import z from 'zod'
import type { zEnv } from './env.schema.js'
import type { zRcFile } from './rc-file.schema.js'

export const zConfig = z.object({
    redis: z.object({
        host: z.string().default('172.0.0.1'),
        port: z.number().int().default(6379),
        user: z.string().optional(),
        password: z.string().optional(),
        db: z.coerce.string().optional().default('0'),
        tls: z.boolean().optional().default(false),
    }).or(z.object({
        connectionString: z.string()
    })),
})

export const parseConfig = (d: {
    env: z.infer<typeof zEnv>;
    rcFile: z.infer<typeof zRcFile>;
}) => zConfig.parse({
    redis: {
        host: d.env.REDIS_HOST ?? d.rcFile.redis?.host,
        port: d.env.REDIS_PORT ?? d.rcFile.redis?.port,
        user: d.env.REDIS_USER ?? d.rcFile.redis?.user,
        password: d.env.REDIS_PASSWORD ?? d.rcFile.redis?.password,
        db: d.env.REDIS_DB ?? d.rcFile.redis?.db,
        tls: d.env.REDIS_TLS ?? d.rcFile.redis?.tls,
        connectionString: d.env.REDIS_CONNECTION_STRING ?? d.rcFile.redis?.connectionString,
    }
})