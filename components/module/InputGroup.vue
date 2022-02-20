<template>
    <div class="w-full flex flex-col gap-1">
        <label :for="id" class="text-base cursor-pointer">
            {{ label }}
        </label>
        <div class="w-full relative flex flex-col gap-1">
            <div class="w-full relative flex items-center gap-1">
                <div class="absolute right-5 cursor-pointer" v-if="type === 'password'">
                    <icon-eye-slash />
                </div>
                <input 
                    :type="type"
                    :placeholder="placeholder"
                    :name="name"
                    :id="id"
                    v-bind="$props"
                    v-model="inputed"
                    class="text-sm w-full h-12 rounded-md border border-gray-200 px-4 outline-none">
            </div>
            <div class="text-xs text-gray-400">
                {{ hint }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'inputGroup',
    props: {
        type: {
            type: String,
            default () {
                return 'text'
            }
        },
        name: {
            type: String,
            default () {
                return ''
            }
        },
        id: {
            type: String,
            default () {
                return ''
            }
        },
        placeholder: {
            type: String,
            default () {
                return ''
            }
        },
        label: {
            type: String,
            default () {
                return ''
            }
        },
        hint: {
            type: String,
            default () {
                return ''
            }
        },
        value: {
            default () {
                return null
            }
        }
    },
    computed : {
        inputed: {
            get(){
                return this.value
            },
            set(value){
                this.$emit("input", value)
            }
        }
    }
}
</script>
