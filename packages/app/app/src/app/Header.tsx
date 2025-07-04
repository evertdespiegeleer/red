import { Box, Text } from 'ink'

export function Header() {
    return (
        <Box>
            <Box flexDirection="row" justifyContent="space-between" width="100%">
                <Box flexDirection="column">
                    <Text color="green">RED Redis CLI</Text>
                    <Text color="grey">A project by Evert De Spiegeleer</Text>
                </Box>
                <Box>
                    <Text color="white">Press `ctrl + c` to quit</Text>
                </Box>
            </Box>
        </Box>
    )

}