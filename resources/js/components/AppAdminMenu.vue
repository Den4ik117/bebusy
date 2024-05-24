<template>
  <ul class="border-t border-[#0F0F0F] py-2 flex flex-col">
    <li>
      <router-link
        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
        :class="{
          'bg-[#2b2b2b]': ['admin.users', 'admin.users.create', 'admin.users.edit'].includes(route.name),
          'hover:bg-[#2b2b2b]': !['admin.users', 'admin.users.create', 'admin.users.edit'].includes(route.name),
        }"
        :to="{ name: 'admin.users' }"
        @click="isOpenMenu = false"
      >
        <i class="bi bi-people flex items-center justify-start"></i>
        <span class="text-sm">Пользователи</span>
      </router-link>
    </li>
    <li>
      <router-link
        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
        :class="{
          'bg-[#2b2b2b]': ['admin.mentors', 'admin.mentors.create', 'admin.mentors.edit'].includes(route.name),
          'hover:bg-[#2b2b2b]': !['admin.mentors', 'admin.mentors.create', 'admin.mentors.edit'].includes(route.name),
        }"
        :to="{ name: 'admin.mentors' }"
        @click="isOpenMenu = false"
      >
        <i class="bi bi-people-fill flex items-center justify-start"></i>
        <span class="text-sm">Менторы</span>
      </router-link>
    </li>
    <li>
      <router-link
        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
        :class="{
          'bg-[#2b2b2b]': ['admin.interviews', 'admin.interviews.create', 'admin.interviews.edit'].includes(route.name),
          'hover:bg-[#2b2b2b]': !['admin.interviews', 'admin.interviews.create', 'admin.interviews.edit'].includes(route.name),
        }"
        :to="{ name: 'admin.interviews' }"
        @click="isOpenMenu = false"
      >
        <i class="bi bi-megaphone-fill flex items-center justify-start"></i>
        <span class="text-sm">Собеседования</span>
      </router-link>
    </li>
    <li>
      <router-link
        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
        :class="{
          'bg-[#2b2b2b]': ['admin.questions', 'admin.questions.create', 'admin.questions.edit'].includes(route.name),
          'hover:bg-[#2b2b2b]': !['admin.questions', 'admin.questions.create', 'admin.questions.edit'].includes(route.name),
        }"
        :to="{ name: 'admin.questions' }"
        @click="isOpenMenu = false"
      >
        <i class="bi bi-question-lg flex items-center justify-start"></i>
        <span class="text-sm">Вопросы</span>
      </router-link>
    </li>
    <li>
      <router-link
        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
        :class="{
          'bg-[#2b2b2b]': ['admin.requirements', 'admin.requirements.create', 'admin.requirements.edit'].includes(route.name),
          'hover:bg-[#2b2b2b]': !['admin.requirements', 'admin.requirements.create', 'admin.requirements.edit'].includes(route.name),
        }"
        :to="{ name: 'admin.requirements' }"
        @click="isOpenMenu = false"
      >
        <i class="bi bi-exclamation-diamond-fill flex items-center justify-start"></i>
        <span class="text-sm">Требования</span>
      </router-link>
    </li>
    <li>
      <router-link
        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
        :class="{
          'bg-[#2b2b2b]': ['admin.requests', 'admin.requests.edit'].includes(route.name),
          'hover:bg-[#2b2b2b]': !['admin.requests', 'admin.requests.edit'].includes(route.name),
        }"
        :to="{ name: 'admin.requests' }"
        @click="isOpenMenu = false"
      >
        <i class="bi bi-ui-radios-grid flex items-center justify-start"></i>
        <span class="text-sm">Заявки</span>
      </router-link>
    </li>
    <li>
      <a
        class="grid grid-cols-[24px_1fr] gap-2 items-center py-3 px-4 text-left hover:bg-[#2b2b2b] w-full"
        href="/"
        @click="isOpenMenu = false"
      >
        <i class="bi bi-box-arrow-right flex items-center justify-start"></i>
        <span class="text-sm">Назад</span>
      </a>
    </li>
  </ul>
</template>

<script setup>
import {useRoute} from "vue-router";
import {isOpenMenu} from "../composable/useUsers.js";

const route = useRoute()
</script>
