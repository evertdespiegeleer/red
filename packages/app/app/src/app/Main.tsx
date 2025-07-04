import { useQuery } from '@tanstack/react-query'
import { data } from '../data/index.js'
import { FullScreen } from '../components/pure/FullScreen.js'
import { Box } from 'ink'
import { useInterval } from '../hooks/use-interval.js'
import { Table } from '../components/pure/Table/Table.js'
import { Header } from './Header.js'
import { WrapperBox } from '../components/BoxWrapper.js'

export function Main() {
    const entriesQuery = useQuery(data.queries.entries.keys)
    useInterval(entriesQuery.refetch, 100)

    return (
        <FullScreen>
            <WrapperBox title='RED'>
                <Header />
                <Box borderStyle="round" borderColor="green" flexDirection="column" flexGrow={1}>
                    <Table
                    columns={{
                        redisKey: {
                            header: 'Key',
                        },
                    }}
                    entries={(entriesQuery.data ?? []).map(e => ({
                        id: e,
                        redisKey: e,
                    }))}
                    />
                </Box>
            </WrapperBox>
        </FullScreen>
    )
}