export const checkRoutesPattern = (route_to_check, routes) => {
    for (const route of routes) {
        const pattern = route.replace(/\//g, '\\/').replace(/\*/g, '.*')
        const regex = new RegExp('^' + pattern + '$')
        if (regex.test(route_to_check)) {
            return true
        }
    }
    return false
}
