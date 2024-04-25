<template>
    <div class="absolute top-0 left-0 bottom-0 right-0 bg-[#212121] z-40">
        <div class="grid grid-rows-[min-content_1fr] h-[100dvh]">
            <SimpleHeader :back="back">
                <template #right>
                    <slot name="right"></slot>
                </template>

                {{ title }}
            </SimpleHeader>

            <div class="p-4 overflow-y-auto">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import SimpleHeader from "@/components/SimpleHeader.vue"

defineProps({
    title: {
        type: String,
        required: true,
    },
    back: {
        type: String,
        required: false,
        default: '',
    },
})
</script>