import { useQuery } from '@tanstack/react-query'
import { data } from '../data/index.js'
import { FullScreen } from '../components/pure/FullScreen.js'
import { Box, Text } from 'ink'
import { useInterval } from '../hooks/use-interval.js'

export function Main() {
    const entriesQuery = useQuery(data.queries.entries.keys)
    useInterval(entriesQuery.refetch, 100)

    return (
        <FullScreen>
            <Box borderStyle="round" borderColor="green" flexDirection="column">
                {
                    (entriesQuery.data ?? []).map((key, index) => (
                        <Text key={index} color="green">
                            {key}
                        </Text>
                    ))
                }
            </Box>
        </FullScreen>
    )
}