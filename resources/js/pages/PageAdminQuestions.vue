<template>
  <AppAdminContainer title="Список вопросов для собеседования">
    <template #header>
      <RouterLink :to="{ name: 'admin.questions.create' }">
        <n-button type="primary" size="small">
          Создать вопрос
        </n-button>
      </RouterLink>
    </template>

    <n-table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Вопрос</th>
        <th class="!text-right">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="question in questions">
        <td>{{ question.id }}</td>
        <td>{{ question.question }}</td>
        <td>
          <AppAdminTableActions
            :id="question.id"
            :to="{ name: 'admin.questions.edit', params: { id: question.id } }"
            text="Вы уверены, что хотите удалить вопрос?"
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
import {questions, useQuestions} from "../composable/useQuestions.js";
import AppAdminContainer from "../components/AppAdminContainer.vue";
import AppAdminTableActions from "../components/AppAdminTableActions.vue";

const questionsStore = useQuestions()

const handleDeleteClick = (id) => {
  questionsStore.destroy(id).then(() => questionsStore.fetch())
}

onMounted(() => {
  questionsStore.fetch()
})
</script>