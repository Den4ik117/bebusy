<template>
    <div class="flex items-center justify-between border-b border-[#0F0F0F] p-2 relative">
        <button class="text-blue-500 hover:text-blue-600 flex items-center gap-0.5" type="button" @click="setPage(back)">
            <i class="bi bi-chevron-left text-xl"></i>
            <span class="text-sm">Назад</span>
        </button>

        <h2 class="text-sm font-medium absolute left-1/2 -translate-x-1/2">
            <slot></slot>
        </h2>

        <slot name="right"></slot>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'

const props = defineProps({
    back: {
        type: String,
        required: false,
        default: '',
    },
})

const store = useStore()

const setPage = (page) => {
    store.commit({
        type: 'setPage',
        value: page,
    })
}
</script>