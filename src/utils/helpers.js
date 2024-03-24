export const timeoutExecutioner = (timeout_in_ms = 1000, callback) => {
    setTimeout(() => {
        callback()
    }, timeout_in_ms)
}
