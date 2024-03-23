export const getQueryStringValue = (unique_name) => {
    return new URLSearchParams(location.search).get(unique_name)
}
