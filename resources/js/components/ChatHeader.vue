<template>
    <div class="grid grid-cols-[min-content_1fr] items-center gap-2 border-b border-[#0F0F0F] p-4">
        <button class="p-2 h-10 w-10 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-300 active:bg-gray-50 active:bg-opacity-10 text-xl" type="button" @click="onMenuClick">
            <i class="bi bi-arrow-left"></i>
        </button>
        <div class="grid grid-cols-[min-content_1fr] gap-2 items-center text-sm relative">
            <div class="w-10 h-10 rounded-full overflow-hidden">
                <img class="w-full h-full object-cover" src="https://img.freepik.com/premium-photo/ai-generated-illustration-of-a-cat-in-cyberpunk-style_861875-2817.jpg" alt="Фотография чата">
            </div>
            <div class="flex flex-col gap-1">
                <div class="font-medium text-sm">{{ activeChat?.user?.full_name || activeChat?.information?.name || 'Загрузка...' }}</div>
                <time class="text-blue-500 text-xs">{{ lastVisitedAt }}</time>
            </div>
<!--            <router-link class="absolute rounded top-0 bottom-0 left-0 right-0" :to="`/chats/${chat.uuid}`"></router-link>-->
        </div>
<!--        <form @submit.prevent="onFormSubmit">-->
<!--            <input class="bg-slate-800 rounded-full h-10 text-sm px-4 w-full placeholder-gray-500 focus:placeholder-gray-600" type="search" placeholder="Поиск">-->
<!--        </form>-->
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import {activeChat} from "../composable/useChats.js";

const store = useStore();

const lastVisitedAt = computed(() => {
  if (activeChat.value?.information?.type === 'GROUP') {
    return 'Группа для общения';
  }

  if (activeChat.value?.user?.last_visit_at) {
    return activeChat.value.user.last_visit_at
  }

  return 'Неизвестно когда был в сети'
})

const onMenuClick = () => {
    store.commit({
        type: 'setHash',
        value: '',
    });
};
</script>
