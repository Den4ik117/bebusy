<template>
    <div class="grid grid-cols-[min-content_1fr_min-content] items-center px-4 pt-4 gap-2">
        <button
            class="p-2 h-10 w-10 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-300 active:bg-gray-50 active:bg-opacity-10 text-xl"
            type="button"
            @click="visible = true"
        >
            <i class="bi bi-list"></i>
        </button>
        <form @submit.prevent="onFormSubmit">
            <input
                class="bg-slate-800# bg-[#181818] rounded-full h-10 text-sm px-4 w-full placeholder-gray-500 focus:placeholder-gray-600"
                type="search"
                placeholder="Поиск"
                v-model="search"
            >
        </form>
        <button
            class="p-2 h-10 w-10 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-300 active:bg-gray-50 active:bg-opacity-10 text-xl"
            type="button"
            @click="setPage('create-chats')"
        >
            <i class="bi bi-plus-lg"></i>
        </button>
        <template v-if="me">
            <transition name="overlay">
                <div
                    v-if="visible"
                    class="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-10"
                    @click="visible = false"
                ></div>
            </transition>
            <transition name="menu">
                <div
                    v-if="visible"
                    class="absolute top-0 bottom-0 left-0 w-[300px] bg-[#212121] z-20 shadow"
                >
                    <div class="grid grid-rows-[min-content_1fr_min-content] min-h-full">
                        <div class="p-4 flex flex-col gap-2 text-sm">
                            <div class="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center font-bold">
                                <span>{{ me.last_name[0] || '' }}{{ me.first_name[0] || '' }}</span>
                            </div>
                            <span class="font-medium text-gray-300">{{ me.full_name }}</span>
                        </div>
                        <div class="flex flex-col">
                            <ul class="border-t border-[#0F0F0F] py-2 flex flex-col">
                                <li>
                                    <button
                                        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
                                        type="button"
                                        @click="setPage('settings')"
                                    >
                                        <i class="bi bi-gear flex items-center justify-start"></i>
                                        <span class="text-sm">Настройки</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
                                        type="button"
                                        @click="setPage('mentoring')"
                                    >
                                        <i class="bi bi-journal-bookmark-fill flex items-center justify-start"></i>
                                        <span class="text-sm">Менторство</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
                                        type="button"
                                        @click="setPage('code-review')"
                                    >
                                        <i class="bi bi-box-arrow-left flex items-center justify-start"></i>
                                        <span class="text-sm">Код-ревью</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
                                        type="button"
                                        @click="setPage('interviews')"
                                    >
                                        <i class="bi bi-clipboard2-check-fill flex items-center justify-start"></i>
                                        <span class="text-sm">Собеседования</span>
                                    </button>
                                </li>
                                <li v-if="me.role === 'ADMIN'">
                                    <router-link
                                        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
                                        :to="{ name: 'admin.dashboard' }"
                                    >
                                        <i class="bi bi-bar-chart-fill flex items-center justify-start"></i>
                                        <span class="text-sm">Панель администратора</span>
                                    </router-link>
                                </li>
                                <li>
                                    <a
                                        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
                                        href="/logout"
                                    >
                                        <i class="bi bi-box-arrow-right flex items-center justify-start"></i>
                                        <span class="text-sm">Выйти</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="p-4 flex flex-col gap-1 text-xs text-gray-500">
                            <span class="font-medium">Соцсеть для соискателей работы</span>
                            <p>Версия {{ version }} — <button class="hover:underline" @click="setPage('about')">О программе</button></p>
                        </div>
                    </div>
                </div>
            </transition>
        </template>
    </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const visible = ref(false);
const version = import.meta.env.VITE_APP_VERSION

const me = computed(() => store.state.me);

const onFormSubmit = () => {
};

const search = computed({
    get: () => store.state.search,
    set: value => store.commit({
        type: 'setSearch',
        value: value,
    })
})

const setPage = (page) => {
    store.commit({
        type: 'setPage',
        value: page,
    })
}
</script>

<style lang="postcss">
.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 0.2s;
}

.overlay-enter-from,
.overlay-leave-to {
    opacity: 0;
}

.menu-enter-active,
.menu-leave-active {
    transition: transform 0.2s;
}

.menu-enter-from,
.menu-leave-to {
    transform: translateX(-300px);
}
</style>
