<template>
    <div class="absolute top-0 left-0 bottom-0 right-0 bg-[#212121] z-40">
        <div class="grid grid-rows-[min-content_1fr] h-[100dvh]">
            <ChatHeader />

            <ChatView />
        </div>
    </div>
</template>

<script setup>
import ChatHeader from '@/modules/chat-header';
import ChatView from '@/modules/chat-view';
</script>
