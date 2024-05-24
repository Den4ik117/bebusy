<template>
  <AppLayout>
    <div class="p-2">
      <n-table>
        <thead>
        <tr>
          <th>Ментор</th>
          <th>Должность</th>
          <th>Опыт</th>
          <th>30 минут</th>
          <th>1 час</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="mentor in mentors" :key="mentor.id">
          <td>
            <router-link
              class="text-indigo-400 hover:underline font-medium"
              :to="{ name: 'mentors.show', params: {slug: mentor.slug} }"
            >
              {{ mentor.user.full_name }}
            </router-link>
          </td>
          <td>{{ mentor.job_title }}</td>
          <td>{{ mentor.experience }}</td>
          <td>{{ mentor.price_per_half_hour }}₽</td>
          <td>{{ mentor.price_per_hour }}₽</td>
        </tr>
        </tbody>
      </n-table>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "../components/AppLayout.vue";
import {mentors, useMentors} from "../composable/useMentors.js";
import {onMounted} from "vue";

const mentorsStore = useMentors()

onMounted(() => {
  mentorsStore.fetch()
})
</script>
