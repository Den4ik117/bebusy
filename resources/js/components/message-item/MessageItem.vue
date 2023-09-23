<template>
    <template v-if="!message.user">
        <div class="flex justify-center">
            <span class="bg-[#212121] px-3 py-1 rounded-full text-sm">{{ message.text }}</span>
        </div>
    </template>
    <template v-else>
        <div
            class="flex gap-2 items-end shadow-md"
            :class="{ 'flex-row': !isMe, 'flex-row-reverse': isMe }"
        >
            <div
                class="w-8 h-8 flex-none rounded-full bg-amber-500"
                :class="{ invisible: !avatar }"
            ></div>
            <div
                class="rounded-md p-2 text-sm whitespace-pre-wrap"
                :class="{ 'bg-[#212121]': !isMe, 'bg-indigo-600': isMe }"
            >
                <ResumeMessage v-if="message.resume"/>
                <span v-else>{{ message.text }}</span>
            </div>
        </div>
    </template>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ResumeMessage from '@/components/resume-message'

const store = useStore();

const props = defineProps({
    message: {
        type: Object,
        required: true,
    },
    avatar: {
        type: Boolean,
        required: false,
        default: true,
    },
});

const isMe = computed(() => store.state.me?.id === props.message.user_id);
</script>
