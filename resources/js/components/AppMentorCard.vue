<template>
    <div class="rounded-md relative">
        <div class="grid grid-cols-[120px_1fr] items-center gap-4">
            <img
                class="h-[120px] w-full object-cover rounded-md"
                :src="mentor.user.image_url"
                :alt="`Фотография ментора «${mentor.user.lastName} ${mentor.user.firstName}»`"
                loading="lazy"
            >
            <div class="flex flex-col gap-0.5 text-xs">
                <span class="font-semibold">{{ mentor.user.lastName }} {{ mentor.user.firstName }}</span>
                <span class="text-gray-500 font-medium">{{ mentor.grade }}</span>
                <span class="text-gray-300">{{ mentor.description }}</span>
            </div>
        </div>
        <button
            class="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
            type="button"
            @click="goToChat(mentor.user)"
        ></button>
    </div>
</template>

<script setup>
import {goToChat} from "@/utils";

defineProps({
    mentor: {
        type: Object,
        required: true,
    },
})
</script>