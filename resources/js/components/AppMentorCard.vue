<template>
    <div class="rounded-md">
        <div class="grid grid-cols-[120px_1fr] items-center gap-4">
            <img
                class="h-auto rounded-md"
                :src="mentor.image"
                :alt="mentor.image"
                loading="lazy"
            >
            <div class="flex flex-col gap-0.5 text-xs">
                <span class="font-semibold">{{ mentor.name }}</span>
                <span class="text-gray-500 font-medium">{{ mentor.position }}</span>
                <span class="text-gray-300">{{ mentor.description }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    mentor: {
        type: Object,
        required: true,
    },
})
</script>