import { Box, Text } from 'ink'

// React Ink box, but with a title centrally on the top border
export function WrapperBox(props: {
    children: React.ReactNode;
    title?: string;
}) {
    return (
        <Box flexDirection="column" width="100%" height="100%">
            <Box flexDirection="row" justifyContent="center" overflow='hidden'>
                <Text color='green' wrap='truncate-start'>
                    {/* Add dashes from left start of the box until title */}
                    {
                        Array.from({ length: 10000 }).fill('─').join('')
                    }
                </Text>

                <Box width={props.title == null ? 0 : props.title.length + 30} justifyContent='center'>
                    {props.title && <Text color="green">{props.title}</Text>}
                </Box>
                
                <Text color='green' wrap='truncate'>{Array.from({ length: 10000 }).fill('─').join('')}</Text>
            </Box>
            <Box flexDirection="column" flexGrow={1} padding={1} borderStyle="round" borderColor="green" borderTop={false}>
                {props.children}
            </Box>
        </Box>
    )
}