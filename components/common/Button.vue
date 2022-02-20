<template>
    <button
        @click="$emit('click')"
        :type="type"
        class="w-full p-4 outline-none text-center rounded-md"
        :class="{'border-none bg-yellow-400' : fill || fill === '', 'border border-yellow-400 bg-white': outline || outline === ''}"
        >
        <div class="text-base font-medium" :class="{'text-white': fill || fill === '', 'text-yellow-400': outline || outline === ''}">
            <slot />
        </div>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        type: {
            type: String,
            default () {
                return 'button'
            }
        },
        fill : {
            default () {
                return false
            }
        },
        outline : {
            default () {
                return false
            }
        },
    }
}
</script>

<style scoped>

</style>