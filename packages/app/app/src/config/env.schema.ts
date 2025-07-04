import z from 'zod'

export const zEnv = z.object({
    REDIS_HOST: z.string().optional(),
    REDIS_PORT: z.coerce.number().int().optional(),
    REDIS_USER: z.string().optional(),
    REDIS_PASSWORD: z.string().optional(),
    REDIS_DB: z.coerce.number().int().optional(),
    REDIS_TLS: z.coerce.boolean().optional(),
    REDIS_CONNECTION_STRING: z.string().optional(),
})