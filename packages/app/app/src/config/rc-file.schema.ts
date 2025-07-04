import z from 'zod'

export const zRcFile = z.object({
    redis: z.object({
        host: z.string().optional(),
        port: z.number().int().optional(),
        user: z.string().optional(),
        password: z.string().optional(),
        db: z.number().int().optional(),
        tls: z.boolean().optional(),
        connectionString: z.string().optional(),
    }).optional()
})