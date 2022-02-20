<template>
    <div class="w-screen flex flex-col bg-white relative justify-center items-center" style="min-height: 100vh;">
        <module-navbar-auth />

        <div class="w-full pl-container flex items-center flex-1 bg-white">
            <div class="w-full flex">
                <div class="w-7/12 flex justify-center items-center flex-col gap-14">
                    <div style="width: 500px; height: 400px">
                        <img src="@/assets/img/rfqq.png" class="w-full h-full" alt="rfqq">
                    </div>
                    <div class="flex flex-col gap-2 text-center">
                        <div class="text-2xl font-bold text-black">
                            Kemudahan Mencari Bahan Baku
                        </div>
                        <div class="text-base font-medium text-gray-400">
                            One click to industry
                        </div>
                    </div>
                </div>
                <div class="w-5/12 flex items-center">
                    <div class="w-full rounded-2xl border border-gray-200 shadow-sm p-9 transition-all duration-500 ease-in-out">
                        <Nuxt />
                    </div>
                </div>
            </div>
        </div>

        <module-footer-auth />

        <transition name="opacity" appear>
            <div v-if="conditionalBackDrop" @click="closeBdrop" class="w-screen h-screen absolute top-0 left-0 bg-black opacity-20 z-10">
            </div>
        </transition>
        <transition name="fadeY" appear>
            <div v-if="isRegistered" style="width: 490px" class="py-12 px-9 bg-white absolute z-20 rounded-2xl text-center flex flex-col gap-14">
                <div class="flex flex-col gap-1">
                    <div class="text-2xl font-bold text-black">
                        Email Belum Terdaftar
                    </div>
                    <div class="text-base text-gray-400">
                        Silahkan lanjutkan pendaftaran untuk membuat akun baru atau ubah untuk menggunakan email lain
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <common-button outline @click="CHANGE_IS_REGISTERED(false)">Ubah</common-button>
                    <common-button fill @click="lanjutDaftar">Lanjut Pendaftaran</common-button>
                </div>
            </div>
        </transition>

        <transition name="opacity" appear>
            <div v-if="isLoading" style="width: 490px" class="py-12 px-9 bg-white absolute z-20 rounded-2xl text-center flex flex-col gap-14">
                <div class="text-base">Sedang memproses...</div>
            </div>
        </transition>

        <transition name="fadeY" appear>
            <div v-if="isLinkSend" style="width: 490px" class="overflow-hidden bg-white absolute z-20 rounded-2xl text-center flex flex-col">
                <div class="w-full h-52 bg-yellow-100 flex justify-center items-center">
                    <svg width="131" height="132" viewBox="0 0 131 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.75 71.4583C17.685 71.4583 5.45831 83.6303 5.45831 98.7499C5.45831 113.869 17.685 126.042 32.75 126.042C47.815 126.042 60.0416 113.815 60.0416 98.7499C60.0416 83.6849 47.8695 71.4583 32.75 71.4583ZM21.615 87.6149H32.75C34.8241 87.6149 36.4616 89.307 36.4616 91.3266C36.4616 93.3462 34.8241 95.0382 32.75 95.0382H21.615C19.5408 95.0382 17.9033 93.3462 17.9033 91.3266C17.9033 89.307 19.5408 87.6149 21.615 87.6149ZM43.885 109.885H21.615C19.5408 109.885 17.9033 108.193 17.9033 106.173C17.9033 104.154 19.5954 102.462 21.615 102.462H43.9395C46.0137 102.462 47.6512 104.154 47.6512 106.173C47.6512 108.193 45.9591 109.885 43.885 109.885Z" fill="#F9BE00"/>
                        <path d="M92.7916 16.875H38.2083C21.8333 16.875 10.9167 25.0625 10.9167 44.1667V61.3058C10.9167 65.2904 15.0104 67.8012 18.6675 66.2183C24.6717 63.5983 31.4946 62.6158 38.645 63.7621C52.9458 66.1091 64.6267 77.4079 67.5196 91.5995C68.3383 95.7479 68.4475 99.787 67.9017 103.662C67.465 106.883 70.085 109.721 73.3054 109.721H92.7916C109.167 109.721 120.083 101.534 120.083 82.4296V44.1667C120.083 25.0625 109.167 16.875 92.7916 16.875ZM95.3571 47.3871L78.2725 61.0329C74.67 63.9258 70.085 65.345 65.5 65.345C60.915 65.345 56.2754 63.9258 52.7275 61.0329L35.6429 47.3871C33.8963 45.9679 33.6233 43.3479 34.9879 41.6012C36.4071 39.8546 38.9725 39.5271 40.7192 40.9462L57.8037 54.5921C61.9521 57.9216 68.9933 57.9216 73.1417 54.5921L90.2262 40.9462C91.9729 39.5271 94.5929 39.8 95.9575 41.6012C97.3766 43.3479 97.1037 45.9679 95.3571 47.3871Z" fill="#F9BE00"/>
                    </svg>
                </div>
                <div class="w-full flex flex-col text-center py-12 px-9 gap-14">
                    <div class="flex flex-col gap-1">
                        <div class="text-2xl text-black font-bold">
                            Link Verifikasi Terkirim
                        </div>
                        <div class="text-base text-gray-400">
                            Silahkan cek dan klik link verifikasi yang telah kami kirimkan ke {{ mailForLink }}
                        </div>
                    </div>

                    <common-button v-if="isForgotPwState" @click="CHANGE_IS_LINK_SEND(false)" outline>Saya Mengerti</common-button>
                    <common-button v-else @click="finishVerif" outline>Saya Mengerti</common-button>
                </div>
            </div>
        </transition>

        <transition name="fadeY" appear>
            <div v-if="isForgotPassword" style="width: 490px" class="py-12 px-9 bg-white absolute z-20 rounded-2xl flex flex-col gap-14">
                <div class="flex flex-col gap-1">
                    <div class="text-2xl font-bold">
                        Lupa Password
                    </div>
                    <div class="text-base text-gray-400">
                        Masukkan email terdaftar dan kami akan mengirimkan link verifikasi untuk mengubah password
                    </div>
                </div>

                <module-input-group 
                    type="email"
                    name="email"
                    id="email_verif"
                    placeholder="Contoh: example@example.com"
                    label="Email"
                    v-model="email"
                />

                <div class="flex items-center gap-2">
                    <common-button outline @click="CHANGE_IS_FORGOT(false)">Batal</common-button>
                    <common-button fill @click="lanjutDaftar('forgot')">Verifikasi</common-button>
                </div>
            </div>
        </transition>

        <transition name="fadeY" appear>
            <div v-if="isFinishCpw" style="width: 490px" class="overflow-hidden bg-white absolute z-20 rounded-2xl text-center flex flex-col">
                <div class="w-full h-52 bg-blue-100 flex justify-center items-center">
                    <svg width="110" height="111" viewBox="0 0 110 111" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.415527" y="0.916748" width="109.167" height="109.167" rx="21.8333" fill="#46D5B2"/>
                        <path d="M33.7729 55.4991L48.935 76.726L82.2914 37.3047" stroke="#FBFBFB" stroke-width="10.9167" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="w-full flex flex-col text-center py-12 px-9 gap-14">
                    <div class="flex flex-col gap-1">
                        <div class="text-2xl text-black font-bold">
                            Password Berhasil Diperbaharui
                        </div>
                        <div class="text-base text-gray-400">
                            Mohon menunggu, anda akan otomatis dialihkan ke halaman Masuk untuk mengakses Poolapack
                        </div>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'layoutAuth',
    computed : {
        ...mapState('stores', ['isRegistered', 'isLoading', 'isLinkSend', 'mailForLink', 'isForgotPassword', 'isFinishCpw']),
        conditionalBackDrop () {
            return this.isLoading || this.isRegistered || this.isLinkSend || this.isForgotPassword || this.isFinishCpw
        }
    },
    data () {
        return {
            isForgotPwState: false,
            email: ''
        }
    },
    methods: {
        ...mapMutations(
            { 
                CHANGE_IS_REGISTERED : 'stores/CHANGE_IS_REGISTERED', 
                CHANGE_IS_LOADING: 'stores/CHANGE_IS_LOADING',
                CHANGE_IS_LINK_SEND: 'stores/CHANGE_IS_LINK_SEND',
                CHANGE_MAIL_VERIF: 'stores/CHANGE_MAIL_VERIF',
                CHANGE_IS_FORGOT: 'stores/CHANGE_IS_FORGOT',
                CHANGE_IS_FINISH_CPW: 'stores/CHANGE_IS_FINISH_CPW'
            }),
        lanjutDaftar (refeer) {
            this.isForgotPwState = refeer === 'forgot' ? false : true
            this.CHANGE_IS_REGISTERED(false)
            this.CHANGE_IS_LOADING(true)
            this.CHANGE_IS_FORGOT(false)
            setTimeout(() => {
                this.CHANGE_IS_LINK_SEND(true)
                this.CHANGE_IS_LOADING(false)
            }, 3000)
        },
        finishVerif () {
            this.CHANGE_MAIL_VERIF(this.email)
            this.CHANGE_IS_LINK_SEND(false)
            this.$router.push(`/new-password?email=${this.mailForLink}`)
        },
        closeBdrop () {
            this.CHANGE_IS_REGISTERED(false)
            this.CHANGE_IS_LINK_SEND(false)
            this.CHANGE_IS_FORGOT(false)
            this.CHANGE_IS_FINISH_CPW(false)
        }
    }
}
</script>
