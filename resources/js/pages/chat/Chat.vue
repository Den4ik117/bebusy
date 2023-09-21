<template>
    <div class="grid grid-rows-[min-content_1fr] h-[100dvh]">
        <ChatHeader />

        <ChatView />
    </div>
</template>

<script setup>
import ChatHeader from '@/modules/chat-header';
import ChatView from '@/modules/chat-view';
</script>
