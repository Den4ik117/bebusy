<template>
    <div class="flex flex-col gap-4">
        <Header/>

        <ul class="px-4 pb-4">
            <ChatItem
                v-for="chat in chats"
                :key="chat.id"
                :chat="chat"
            />
        </ul>

        <transition name="chat">
            <div v-if="isOpenChat" class="absolute top-0 left-0 bottom-0 right-0 bg-[#212121] z-40">
                <Chat />
            </div>
        </transition>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Header from '@/modules/header';
import ChatItem from '@/components/chat-item';
import Chat from '@/pages/chat';

const store = useStore();

const isOpenChat = computed(() => !!store.state.hash);

const chats = computed(() => store.state.chats);
</script>

<style>
.chat-enter-active,
.chat-leave-active {
    transition: transform 0.2s;
}

.chat-enter-from,
.chat-leave-to {
    transform: translateX(100%);
}
</style>
