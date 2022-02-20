<template>
    <div class="w-full relative flex flex-col" id="parentlayout">
        <module-navbar-mains />
        <Nuxt />
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'appDefault',
    middleware: 'auth_page',
    mounted () {
        if (localStorage.getItem('authenticated') === 'true') {
            this.CHANGE_AUTHENTICATE(true)
        } else {
            this.CHANGE_AUTHENTICATE(false)
        }
    },
    methods: {
        ...mapMutations({
            CHANGE_AUTHENTICATE: 'auth/CHANGE_AUTHENTICATE'
        })
    }
}
</script>
