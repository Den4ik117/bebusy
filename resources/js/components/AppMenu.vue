<template>
  <div
    class="w-[300px] bg-[#212121]"
    :class="{
      'absolute top-0 bottom-0 left-0 shadow z-20': absolute,
      'border-r border-[#0F0F0F]': !absolute,
    }"
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
            <router-link
              class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
              :to="{ name: 'mentors' }"
            >
              <i class="bi bi-journal-bookmark-fill flex items-center justify-start"></i>
              <span class="text-sm">Менторство</span>
            </router-link>
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
            <router-link
              class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
              :to="{ name: 'interviews' }"
            >
              <i class="bi bi-clipboard2-check-fill flex items-center justify-start"></i>
              <span class="text-sm">Собеседования</span>
            </router-link>
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
</template>

<script setup>
import {ref, computed, watch} from 'vue';
import { useStore } from 'vuex';
import { me } from '@/composable/useUsers.js'

defineProps({
  absolute: Boolean
})

const store = useStore();

const visible = ref(false);
const version = import.meta.env.VITE_APP_VERSION

const setPage = (page) => {
  store.commit({
    type: 'setPage',
    value: page,
  })
}
</script>
