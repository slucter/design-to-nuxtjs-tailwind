export default function ({ store, redirect, route }) {
    if (localStorage.authenticated === 'true') {
        store.commit('auth/CHANGE_AUTHENTICATE', true)
    }
    if (!store.state.auth.authenticated) {
        let fullpath = route.fullPath
        redirect(`/login?redirect=${fullpath}`)
    }
  }