<template>
    <div class="grid grid-cols-[min-content_1fr] hover:bg-slate-800$ hover:bg-[#2b2b2b] rounded gap-4 p-2 items-center text-sm relative">
        <div class="w-14 h-14 rounded-full overflow-hidden">
            <img class="w-full h-full object-cover" src="https://img.freepik.com/premium-photo/ai-generated-illustration-of-a-cat-in-cyberpunk-style_861875-2817.jpg" alt="Фотография чата">
        </div>
        <div class="grid grid-cols-[1fr_min-content] items-center gap-x-2 gap-y-1">
            <div class="font-medium">{{ chat.user?.full_name || chat.information.name }}</div>
            <time class="text-gray-500 text-xs">{{ chat.messages.at(-1)?.human_created_at }}</time>
            <div class="text-gray-500 text-xs truncate">
                <span class="text-blue-500">{{ chat.messages.at(-1)?.user?.full_name || 'Система' }}: </span>
                <span>{{ chat.messages.at(-1)?.content }}</span>
            </div>
<!--            <span class="w-5 h-5 text-xs rounded-full bg-slate-700 flex items-center justify-center text-white font-medium justify-self-end">4</span>-->
        </div>
        <button class="absolute rounded top-0 bottom-0 left-0 right-0" type="button" @click="onChatItemClick"></button>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'

const props = defineProps({
    chat: {
        type: Object,
        required: true,
    },
});

const store = useStore();

const onChatItemClick = () => {
    store.commit({
        type: 'setHash',
        value: props.chat.information.uuid,
    })
};
</script>
