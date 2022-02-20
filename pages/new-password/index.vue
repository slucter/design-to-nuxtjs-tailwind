<template>
    <div class="w-full">
        <div class="flex flex-col gap-2">
            <div class="text-2xl font-bold text-black-300">
                Buat Sandi Baru
            </div>
            <div class="text-base text-gray-400">
                Silahkan masukkan password baru untuk dapat menggunakan akun <a class="text-gray-600 font-bold">{{ mailToChangePw }}</a>
            </div>
        </div>
        <div class="h-14"></div>
        <form @submit.prevent="submit" class="flex flex-col gap-6">
            <module-input-group 
                type="password"
                name="sandi1"
                id="sandi1"
                placeholder="Masukan password anda disini"
                label="Password Baru"
                hint="Kombinasi angka, huruf besar dan huruf kecil"
                v-model="form.password"
            />
            <module-input-group 
                type="password"
                name="sandi2"
                id="sandi2"
                placeholder="Silahkan ulangi password anda"
                label="Konfirmasi Password Baru"
                hint="Kombinasi angka, huruf besar dan huruf kecil"
                v-model="form.newPassword"
            />

            <common-button type="submit" fill>
                Selesaikan
            </common-button>
        </form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'newPassword',
    layout: 'auth',
    data () {
        return {
            form: {
                password: '',
                newPassword: ''
            },
        }
    },
    computed: {
        mailToChangePw () {
            return this.$route.query?.email ?? ' - '
        }
    },
    methods: {
        ...mapMutations(
            {
                CHANGE_IS_REGISTERED : 'stores/CHANGE_IS_REGISTERED',
                CHANGE_IS_LOADING: 'stores/CHANGE_IS_LOADING',
                CHANGE_MAIL_VERIF: 'stores/CHANGE_MAIL_VERIF',
                CHANGE_IS_FORGOT: 'stores/CHANGE_IS_FORGOT',
                CHANGE_IS_FINISH_CPW: 'stores/CHANGE_IS_FINISH_CPW'
            }),
        
        submit () {
            this.CHANGE_IS_FINISH_CPW(true)
            setTimeout(() => {
                this.$router.push('/login')
                this.CHANGE_IS_FINISH_CPW(false)
            }, 3000)
        }
    }
}
</script>
