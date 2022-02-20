<template>
    <div class="w-full">
        <div class="flex flex-col gap-2">
            <div class="text-2xl font-bold text-black-300">
                Masuk Akun
            </div>
            <div class="text-base text-gray-400">
                Isi email untuk masuk atau <a href="#" class="text-yellow-500 font-medium">daftarkan akun</a>
            </div>
        </div>
        <div class="h-14"></div>
        <form @submit.prevent="userCheck" class="flex flex-col gap-6">
            <module-input-group 
                type="email"
                name="email"
                id="email"
                placeholder="Masukan Email"
                label="Email"
                v-model="form.email"
            />
            <transition name="opacity" appear>
                <module-input-group 
                    v-if="next"
                    type="password"
                    name="sandi"
                    id="sandi"
                    placeholder="Masukan Kata Sandi"
                    label="Kata Sandi"
                    hint="Kombinasi angka, huruf besar dan huruf kecil"
                    v-model="form.password"
                />
            </transition>

            <div class="text-base text-gray-400">
                Lupa sandi? Silahkan ke halaman <a href="#" @click.prevent="CHANGE_IS_FORGOT(true)" class="text-yellow-500 font-medium">lupa password</a>
            </div>
            <common-button type="submit" fill>
                {{ next | labelButton }}
            </common-button>
        </form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'Auth',
    layout: 'auth',
    data () {
        return {
            next: false,
            form: {
                email: '',
                password: ''
            },
            validUser: false,
        }
    },
    filters: {
        labelButton (val) {
            return val ? 'Masuk' : 'Selanjutnya'
        }
    },
    methods: {
        ...mapMutations(
            {
                CHANGE_IS_REGISTERED : 'stores/CHANGE_IS_REGISTERED',
                CHANGE_IS_LOADING: 'stores/CHANGE_IS_LOADING',
                CHANGE_MAIL_VERIF: 'stores/CHANGE_MAIL_VERIF',
                CHANGE_IS_FORGOT: 'stores/CHANGE_IS_FORGOT',
            }),
        async userCheck () {
            try {
                let user = await this.$axios.$get('/user.json', {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    }
                })

                if (user.email !== this.form.email) {
                    this.CHANGE_MAIL_VERIF(this.form.email)
                    throw '_error1'
                    return
                }
                if (this.next) {
                    if (user.password !== this.form.password) {
                        throw '_error2'
                        return
                    }

                    this.CHANGE_IS_LOADING(true)
                    this.validUser = true

                    return
                }
                this.next = true

            } catch (error) {
                if (error === '_error1') return this.CHANGE_IS_REGISTERED(true)
                if (error === '_error2') {
                    console.log(error, 'error 2')
                }
            } finally {
                setTimeout(() => {
                    this.CHANGE_IS_LOADING(false)
                    if (this.validUser) {
                        this.$router.push('/produk/detail/1')
                    }
                }, 3000)
            }
        }
    }
}
</script>
