import { Box } from 'ink'
import { useEffect, useState, type ReactNode } from 'react'

function useStdoutDimensions(): [number, number] {
    const {columns, rows} = process.stdout
    const [size, setSize] = useState({columns, rows})
    useEffect(() => {
		function onResize() {
			const {columns, rows} = process.stdout
			setSize({columns, rows})
		}
		process.stdout.on('resize', onResize)
		return () => {
			process.stdout.off('resize', onResize)
		}
	}, [])
    return [size.columns, size.rows]
}

export const FullScreen = (props: { children: ReactNode }) => {
    const [columns, rows] = useStdoutDimensions()

  useEffect(() => {
    process.stdout.write('\x1Bc')
  }, [])

  return <Box width={columns} height={rows - 1}>{props.children}</Box>
}
