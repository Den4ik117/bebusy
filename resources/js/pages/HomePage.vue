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

        <transition name="page-animation">
            <ChatPage v-if="isOpenChat"/>
        </transition>

        <transition name="page-animation">
            <SettingsPage v-if="currentPage === 'settings'"/>
        </transition>

        <transition name="page-animation">
            <MentoringPage v-if="currentPage === 'mentoring'"/>
        </transition>

        <transition name="page-animation">
            <CodeReviewPage v-if="currentPage === 'code-review'"/>
        </transition>

        <transition name="page-animation">
            <InterviewsPage v-if="currentPage === 'interviews'"/>
        </transition>

        <transition name="page-animation">
            <AboutPage v-if="currentPage === 'about'"/>
        </transition>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Header from '@/modules/header';
import ChatItem from '@/components/chat-item';
import ChatPage from '@/pages/ChatPage.vue';
import MentoringPage from "@/pages/MentoringPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import CodeReviewPage from "@/pages/CodeReviewPage.vue";
import InterviewsPage from "@/pages/InterviewsPage.vue";
import AboutPage from "@/pages/AboutPage.vue";

const store = useStore();

const isOpenChat = computed(() => !!store.state.hash);
const currentPage = computed(() => store.state.page);

const chats = computed(() => store.state.chats);
</script>

<style>
.page-animation-enter-active,
.page-animation-leave-active {
    transition: transform 0.2s;
}

.page-animation-enter-from,
.page-animation-leave-to {
    transform: translateX(100%);
}
</style>
