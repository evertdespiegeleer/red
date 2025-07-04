import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { queryClient } from '../query-client.js'

export function AppProvider(props: {
    children: ReactNode
}) {
    return (
    <QueryClientProvider client={queryClient}>
        {props.children}
    </QueryClientProvider>
    )
}