export const state = () => ({
    authenticated: false,
})

export const mutations = {
    CHANGE_AUTHENTICATE (state, payload) {
        state.authenticated = payload
    },
}
