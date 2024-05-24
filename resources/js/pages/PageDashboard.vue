<template>
  <AppAdminContainer title="Панель администратора">
    <template v-if="dashboard">

      <div class="rounded bg-gradient-to-r from-gray-700 to-gray-800 p-2 flex flex-col gap-0.5">
        <h2 class="text-sm font-bold">Статистика</h2>
        <span class="text-xs text-gray-500">Основная статистика по ключевым таблицам</span>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          <div class="rounded bg-amber-300 flex flex-col gap-2 p-2">
            <div class="w-8 h-8 bg-amber-500 flex justify-center items-center rounded-full">
              <i class="bi bi-people-fill"></i>
            </div>
            <span class="text-2xl font-semibold text-black">{{ dashboard.users_count }}</span>
            <span class="text-xs font-medium text-gray-600">Суммарно пользователей</span>
          </div>

          <div class="rounded bg-blue-300 flex flex-col gap-2 p-2">
            <div class="w-8 h-8 bg-blue-500 flex justify-center items-center rounded-full">
              <i class="bi bi-people"></i>
            </div>
            <span class="text-2xl font-semibold text-black">{{ dashboard.mentors_count }}</span>
            <span class="text-xs font-medium text-gray-600">Суммарно менторов</span>
          </div>

          <div class="rounded bg-green-300 flex flex-col gap-2 p-2">
            <div class="w-8 h-8 bg-green-500 flex justify-center items-center rounded-full">
              <i class="bi bi-ui-radios-grid"></i>
            </div>
            <span class="text-2xl font-semibold text-black">{{ dashboard.requests_count }}</span>
            <span class="text-xs font-medium text-gray-600">Суммарно заявок</span>
          </div>

          <div class="rounded bg-slate-300 flex flex-col gap-2 p-2">
            <div class="w-8 h-8 bg-slate-500 flex justify-center items-center rounded-full">
              <i class="bi bi-megaphone-fill"></i>
            </div>
            <span class="text-2xl font-semibold text-black">{{ dashboard.interviews_count }}</span>
            <span class="text-xs font-medium text-gray-600">Суммарно собеседований</span>
          </div>

          <div class="rounded bg-indigo-300 flex flex-col gap-2 p-2">
            <div class="w-8 h-8 bg-indigo-500 flex justify-center items-center rounded-full">
              <i class="bi bi-exclamation-diamond-fill"></i>
            </div>
            <span class="text-2xl font-semibold text-black">{{ dashboard.requirements_count }}</span>
            <span class="text-xs font-medium text-gray-600">Суммарно требований</span>
          </div>

          <div class="rounded bg-emerald-300 flex flex-col gap-2 p-2">
            <div class="w-8 h-8 bg-emerald-500 flex justify-center items-center rounded-full">
              <i class="bi bi-question-lg"></i>
            </div>
            <span class="text-2xl font-semibold text-black">{{ dashboard.questions_count }}</span>
            <span class="text-xs font-medium text-gray-600">Суммарно вопросов</span>
          </div>

          <div class="rounded bg-red-300 flex flex-col gap-2 p-2">
            <div class="w-8 h-8 bg-red-500 flex justify-center items-center rounded-full">
              <i class="bi bi-chat-fill"></i>
            </div>
            <span class="text-2xl font-semibold text-black">{{ dashboard.messages_count }}</span>
            <span class="text-xs font-medium text-gray-600">Суммарно сообщений</span>
          </div>

          <div class="rounded bg-purple-300 flex flex-col gap-2 p-2">
            <div class="w-8 h-8 bg-purple-500 flex justify-center items-center rounded-full">
              <i class="bi bi-chat-right-fill"></i>
            </div>
            <span class="text-2xl font-semibold text-black">{{ dashboard.chats_count }}</span>
            <span class="text-xs font-medium text-gray-600">Суммарно чатов</span>
          </div>
        </div>
      </div>

    </template>
  </AppAdminContainer>
</template>

<script setup>
import AppAdminContainer from "../components/AppAdminContainer.vue";
import {dashboard, useDashboard} from "../composable/useDashboard.js";
import {onMounted} from "vue";

const dashboardStore = useDashboard()

onMounted(() => {
  dashboardStore.fetch()
})
</script>
