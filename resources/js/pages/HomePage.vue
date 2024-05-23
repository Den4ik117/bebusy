<template>
  <div v-if="isAuth" class="lg:max-w-screen-lg max-w-md w-full mx-auto bg-[#212121] h-[100dvh] border-x border-[#0F0F0F] relative overflow-hidden">
    <div class="flex flex-col max-h-[100dvh] gap-4">
        <Header/>

        <ul class="px-4 pb-4 overflow-y-auto">
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
            <CodeReviewPage v-if="currentPage === 'code-review'"/>
        </transition>

        <transition name="page-animation">
            <AboutPage v-if="currentPage === 'about'"/>
        </transition>

        <transition name="page-animation-down">
            <RequestCodeReviewPage v-if="currentPage === 'request-code-review'"/>
        </transition>

        <transition name="page-animation-down">
            <CreateChatsPage v-if="currentPage === 'create-chats'"/>
        </transition>
    </div>
  </div>
  <div v-else class="max-w-md w-full mx-auto h-[100dvh] flex flex-col justify-center items-center">
    <a
      class="text-indigo-400 px-4 py-2 rounded uppercase text-sm font-medium hover:bg-indigo-100 hover:bg-opacity-10"
      href="/oauth/redirect"
    >Войти через HeadHunter</a>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import ChatItem from '@/components/ChatItem.vue';
import ChatPage from '@/pages/ChatPage.vue';
import SettingsPage from "@/pages/SettingsPage.vue";
import CodeReviewPage from "@/pages/CodeReviewPage.vue";
import AboutPage from "@/pages/AboutPage.vue";
import RequestCodeReviewPage from "@/pages/RequestCodeReviewPage.vue";
import CreateChatsPage from "@/pages/CreateChatsPage.vue";
import {isAuth} from "../composable/useUsers.js";

const store = useStore();

const isOpenChat = computed(() => !!store.state.hash);
const currentPage = computed(() => store.state.page);

const chats = computed(() => store.getters.computedChats);
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

.page-animation-down-enter-active,
.page-animation-down-leave-active {
    transition: transform 0.2s;
}
.page-animation-down-enter-from,
.page-animation-down-leave-to {
    transform: translateY(100%);
}
</style>
