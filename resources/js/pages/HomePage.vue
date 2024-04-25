<template>
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

        <transition name="page-animation-down">
            <BecomeMentorPage v-if="currentPage === 'become-mentor'"/>
        </transition>

        <transition name="page-animation-down">
            <RequestCodeReviewPage v-if="currentPage === 'request-code-review'"/>
        </transition>

        <transition name="page-animation-down">
            <IndividualInterviewPage v-if="currentPage === 'individual-interviews'"/>
        </transition>

        <transition name="page-animation-down">
            <GroupInterviewPage v-if="currentPage === 'group-interviews'"/>
        </transition>

        <transition name="page-animation-down">
            <CreateChatsPage v-if="currentPage === 'create-chats'"/>
        </transition>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import ChatItem from '@/components/ChatItem.vue';
import ChatPage from '@/pages/ChatPage.vue';
import MentoringPage from "@/pages/MentoringPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import CodeReviewPage from "@/pages/CodeReviewPage.vue";
import InterviewsPage from "@/pages/InterviewsPage.vue";
import AboutPage from "@/pages/AboutPage.vue";
// import FindMentorPage from "@/pages/FindMentorPage.vue";
import BecomeMentorPage from "@/pages/BecomeMentorPage.vue";
import RequestCodeReviewPage from "@/pages/RequestCodeReviewPage.vue";
import IndividualInterviewPage from "@/pages/IndividualInterviewPage.vue";
import GroupInterviewPage from "@/pages/GroupInterviewPage.vue";
import CreateChatsPage from "@/pages/CreateChatsPage.vue";

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
