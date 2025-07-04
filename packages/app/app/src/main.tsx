import { render } from 'ink'
import React from 'react'
import { loadConfig } from './config/config.js'

async function main() {
    await loadConfig()

    const { connectRedis } = await import('./redis.js')
    await connectRedis()

    const { App } = await import('./app/App.js')
    render(<App />)
}

main().catch((error) => {
    console.error('An error occurred:', error)
    process.exit(1)
})