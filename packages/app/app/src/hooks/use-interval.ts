import { useEffect } from 'react'

export const useInterval = (callback: () => unknown, delay: number) => {
    useEffect(() => {
        const interval = setInterval(() => {
            callback()
        }, delay)

        return () => clearInterval(interval)
    })
}