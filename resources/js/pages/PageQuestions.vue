<template>
  <AppLayout>
    <div class="p-2">
      <n-table>
        <thead>
        <tr>
          <th>Вопрос</th>
          <th>Тег</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="question in questions" :key="question.id">
          <td>
            <router-link
              class="text-indigo-400 hover:underline font-medium"
              :to="{ name: 'questions.show', params: {id: question.id} }"
            >
              {{ question.question }}
            </router-link>
          </td>
          <td>{{ question.tag?.name || 'Нет' }}</td>
        </tr>
        </tbody>
      </n-table>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "../components/AppLayout.vue";
import {onMounted} from "vue";
import {questions, useQuestions} from "../composable/useQuestions.js";

const questionsStore = useQuestions()

onMounted(() => {
  questionsStore.fetch()
})
</script>
