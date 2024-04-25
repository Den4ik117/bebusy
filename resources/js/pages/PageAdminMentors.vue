<template>
  <AppAdminContainer title="Список менторов">
    <template #header>
      <RouterLink :to="{ name: 'admin.mentors.create' }">
        <n-button type="primary" size="small">
          Создать ментора
        </n-button>
      </RouterLink>
    </template>

    <n-table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Пользователь</th>
        <th>Должность</th>
        <th class="!text-right">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="mentor in mentors">
        <td>{{ mentor.id }}</td>
        <td>{{ mentor.user.full_name }}</td>
        <td>{{ mentor.job_title }}</td>
        <td>
          <AppAdminTableActions
            :id="mentor.id"
            :to="{ name: 'admin.mentors.edit', params: { id: mentor.id } }"
            text="Вы уверены, что хотите удалить ментора?"
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
import {mentors, useMentors} from "../composable/useMentors.js";
import AppAdminContainer from "../components/AppAdminContainer.vue";
import AppAdminTableActions from "../components/AppAdminTableActions.vue";

const mentorsStore = useMentors()

const handleDeleteClick = (id) => {
  mentorsStore.destroy(id).then(() => mentorsStore.fetch())
}

onMounted(() => {
  mentorsStore.fetch()
})
</script>