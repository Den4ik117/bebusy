<template>
    <div class="grid grid-cols-[min-content_1fr] items-center px-4 pt-4 gap-2">
        <button
            class="p-2 h-10 w-10 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-300 active:bg-gray-50 active:bg-opacity-10 text-xl"
            type="button"
            @click="visible = true"
        >
            <i class="bi bi-list"></i>
        </button>
        <form @submit.prevent="onFormSubmit">
            <input class="bg-slate-800# bg-[#181818] rounded-full h-10 text-sm px-4 w-full placeholder-gray-500 focus:placeholder-gray-600" type="search" placeholder="Поиск">
        </form>
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
                            <div class="w-12 h-12 rounded-full bg-amber-500"></div>
                            <span class="font-medium text-gray-300">{{ me.full_name }}</span>
                        </div>
                        <div class="flex flex-col">
                            <ul class="border-t border-[#0F0F0F] py-2 flex flex-col">
                                <li>
                                    <button
                                        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
                                        type="button"
                                    >
                                        <i class="bi bi-gear flex items-center justify-start"></i>
                                        <span class="text-sm">Настройки</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
                                        type="button"
                                        @click="setVisibleMyResumes"
                                    >
                                        <i class="bi bi-file-earmark-fill flex items-center justify-start"></i>
                                        <span class="text-sm">Мои резюме</span>
                                    </button>
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
                            <p>Версия {{ '1.0.0' }} — <a class="hover:underline" href="#">О программе</a></p>
                        </div>
                    </div>
                </div>
            </transition>

            <Modal v-model:visible="visibleMyResumes">
                <div class="flex flex-col gap-4">
                    <h3 class="text-base font-medium text-center">Мои резюме</h3>
                    <ul class="flex flex-col gap-4">
                        <li
                            class="border rounded-md border-slate-700 p-4 flex flex-col gap-2"
                            v-for="resume in resumes"
                            :key="resume.id"
                        >
                            <h4 class="text-sm">
                                <a class="text-indigo-400 hover:text-indigo-600 font-medium" href="">{{ resume.data.title }}</a>
                            </h4>
                            <time class="text-xs" :datetime="resume.data.updated_at">Обновлено {{ resume.data.formatted_updated_at }} </time>
                            <div class="flex flex-wrap gap-4">
                                <button
                                    class="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-500 px-2 py-1 text-xs rounded"
                                    type="button"
                                    :disabled="resume.published_at"
                                    @click="() => publishResume(resume.uuid)"
                                >{{ resume.published_at ? 'Опубликовано' : 'Опубликовать' }}</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </Modal>
        </template>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
// import { version } from '../../../../package.json';
import Modal from '@/components/modal'

const store = useStore();

const visible = ref(false);
const visibleMyResumes = ref(false)

const setVisibleMyResumes = () => {
    visibleMyResumes.value = true
    visible.value = false
}

const me = computed(() => store.state.me);
const resumes = computed(() => store.state.resumes)

const onFormSubmit = () => {
    console.log('submit')
};

const publishResume = (uuid) => {
    store.dispatch({
        type: 'publishResume',
        uuid: uuid,
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
