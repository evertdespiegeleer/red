import { cosmiconfig } from 'cosmiconfig'
import type z from 'zod'
import { parseConfig, type zConfig } from './config.schema.js'
import { zEnv } from './env.schema.js'

let config: z.infer<typeof zConfig> | undefined


export const loadConfig = async () => {
    const explorer = cosmiconfig('red', {
        searchStrategy: 'project',
    })

    const configFileResults = await explorer.search()

    config = parseConfig({
        env: zEnv.parse(process.env),
        rcFile: configFileResults?.config ?? {},
    })
}

export const getConfig = () => {
    if (config == null) {
        throw new Error('Config not loaded.')
    }
    return config
}