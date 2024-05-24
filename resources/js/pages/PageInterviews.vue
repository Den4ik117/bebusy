<template>
  <AppLayout>
    <div class="p-2">
      <n-table>
        <thead>
        <tr>
          <th>Название</th>
          <th>Должность</th>
          <th>Грейд</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="interview in interviews" :key="interview.id">
          <td>
            <a
              class="text-indigo-400 hover:underline font-medium"
              :href="interview.url"
            >
              {{ interview.title }}
            </a>
          </td>
          <td>{{ interview.direction.name }}</td>
          <td>{{ interview.grade.name }}</td>
        </tr>
        </tbody>
      </n-table>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "../components/AppLayout.vue";
import {onMounted} from "vue";
import {interviews, useInterviews} from "../composable/useInterviews.js";

const interviewsStore = useInterviews()

onMounted(() => {
  interviewsStore.fetch()
})
</script>
