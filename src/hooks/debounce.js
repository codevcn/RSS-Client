export const useDebounce = () => {
    return (func, delay) => {
        let timer
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => func(...args), delay)
        }
    }
}
