export const state = () => ({
    isRegistered: false,
    isLoading: false,
    isLinkSend: false,
    mailForLink: '',
    isForgotPassword: false,
    isFinishCpw: false,
})

export const mutations = {
    CHANGE_IS_REGISTERED (state, payload) {
        state.isRegistered = payload
    },
    CHANGE_IS_LOADING (state, payload) {
        state.isLoading = payload
    },
    CHANGE_IS_LINK_SEND (state, payload) {
        state.isLinkSend = payload
    },
    CHANGE_MAIL_VERIF (state, payload) {
        state.mailForLink = payload
    },
    CHANGE_IS_FORGOT (state, payload) {
        state.isForgotPassword = payload
    },
    CHANGE_IS_FINISH_CPW (state, payload) {
        state.isFinishCpw = payload
    }
}
