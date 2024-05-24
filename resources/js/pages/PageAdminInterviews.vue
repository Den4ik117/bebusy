<template>
  <AppAdminContainer title="Список собеседований">
    <template #header>
      <RouterLink :to="{ name: 'admin.interviews.create' }">
        <n-button type="primary" size="small">
          Создать собеседование
        </n-button>
      </RouterLink>
    </template>

    <n-table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Название</th>
        <th>Ссылка</th>
        <th class="!text-right">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="interview in interviews">
        <td>{{ interview.id }}</td>
        <td>{{ interview.title }}</td>
        <td>
          <a class="underline" :href="interview.url">Ссылка</a>
        </td>
        <td>
          <AppAdminTableActions
            :id="interview.id"
            :to="{ name: 'admin.interviews.edit', params: { id: interview.id } }"
            text="Вы уверены, что хотите удалить собеседование?"
            @destroy="handleDeleteClick"
          />
        </td>
      </tr>
      </tbody>
    </n-table>
  </AppAdminContainer>
</template>

<script setup>
import { onMounted } from "vue";
import {interviews, useInterviews} from "../composable/useInterviews.js";
import AppAdminContainer from "../components/AppAdminContainer.vue";
import AppAdminTableActions from "../components/AppAdminTableActions.vue";

const interviewsStore = useInterviews()

const handleDeleteClick = (id) => {
  interviewsStore.destroy(id).then(() => interviewsStore.fetch())
}

onMounted(() => {
  interviewsStore.fetch()
})
</script>