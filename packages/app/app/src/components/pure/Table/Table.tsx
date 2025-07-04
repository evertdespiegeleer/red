import { Box, Text, Transform, useInput } from 'ink'
import { useRef } from 'react';

type AnyEntry = { id: string } & Record<string, string>
type ColumnConfig = {
    header: string;
}

// React Ink Table component. This is for React Ink, NOT the browser. We can't use regular HTML tags here.
interface TableProps<Entry extends AnyEntry> {
    entries: Entry[];
    columns: Partial<Record<keyof Entry, ColumnConfig>>;
    rowKey?: (entry: Entry) => string;
    rowRenderer?: Record<keyof Entry, (entry: Entry) => React.ReactNode>;
    onRowClick?: (entry: Entry) => unknown;
}

export function Table<Entry extends { id: string } & Record<string, string>>(props: TableProps<Entry>) {
    const { columns = {} } = props

    return (
        <Box flexDirection="column" width="100%" height="100%">
            {/* Header */}
            <Box flexDirection="row">
                {Object.entries(columns).map((_e) => {
                    const [key, column] = _e as [keyof Entry, ColumnConfig]
                    return (
                        <Text key={key as string} bold backgroundColor='black'>
                            {column.header.padEnd(10, ' ')}
                        </Text>
                    )
                })}
            </Box>

            {/* Rows */}
            {props.entries.map((entry) => (
                <Box
                    key={props.rowKey ? props.rowKey(entry) : entry.id}
                    flexDirection="row"
                // onClick={() => props.onRowClick?.(entry)}
                >
                    {Object.entries(columns).map((_e) => {
                        const [key, columnConfig] = _e as [keyof Entry, ColumnConfig]
                        const cellContent = props.rowRenderer?.[key as keyof Entry]
                            ? props.rowRenderer[key as keyof Entry](entry)
                            : entry[key as keyof Entry]

                        return (
                            <Text key={key as string} color='cyan'>
                                {cellContent}
                            </Text>
                        )
                    })}
                </Box>
            ))}
        </Box>
    )
}