<template>
    <div class="grid grid-cols-[min-content_1fr_min-content] lg:grid-cols-[1fr_min-content] items-center px-4 pt-4 gap-2">
        <button
            class="flex lg:hidden p-2 h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:text-gray-300 active:bg-gray-50 active:bg-opacity-10 text-xl"
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
              <AppMenu v-if="visible" absolute/>
            </transition>
        </template>
    </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue';
import { useStore } from 'vuex';
import { me } from '@/composable/useUsers.js'
import AppMenu from "./AppMenu.vue";

const store = useStore();

const visible = ref(false);

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
