<template>
  <AppLayout>
    <div class="p-2">
      <template v-if="mentor">
        <div class="grid md:grid-cols-[250px_1fr] gap-4">
          <div class="flex flex-col gap-4">
            <img
              class="w-full rounded-lg"
              :src="mentor.user.avatar_url"
              :alt="mentor.user.avatar_url"
            >
            <span>Цена за 30 минут: {{ mentor.price_per_half_hour }}₽</span>
            <span>Цена за 1 час: {{ mentor.price_per_hour }}₽</span>
          </div>
          <div class="flex flex-col gap-3">
            <h1 class="text-2xl">{{ mentor.user.full_name }}</h1>
            <span class="text-sm">{{ mentor.job_title }} | {{ mentor.experience }}</span>
            <div class="flex gap-2">
              <a :href="mentor.user.telegram">
                <n-button
                  type="primary"
                >Написать в Telegram</n-button>
              </a>
              <a :href="mentor.user.github">
                <n-button
                  type="primary"
                >Перейти в GitHub</n-button>
              </a>
            </div>
<!--            <div>-->
              <div class="text-lg font-medium mt-4">О менторе</div>
              <span v-html="mentor.about"></span>
              <div class="flex flex-wrap gap-1 mt-2">
                <span>Направления:</span>
                <span
                  class="bg-indigo-500 rounded-full px-2 font-medium text-xs py-0.5"
                  v-for="direction in mentor.directions"
                  :key="direction.id"
                >{{ direction.name }}</span>
              </div>
              <div class="flex flex-wrap gap-1 mt-2">
                <span>Могу помочь:</span>
                <span
                  class="bg-indigo-500 rounded-full px-2 font-medium text-xs py-0.5"
                  v-for="service in mentor.services"
                  :key="service.id"
                >{{ service.name }}</span>
              </div>
              <div class="flex flex-wrap gap-1 mt-2">
                <span>Навыки:</span>
                <span
                  class="bg-indigo-500 rounded-full px-2 font-medium text-xs py-0.5"
                  v-for="skill in mentor.skills"
                  :key="skill.id"
                >{{ skill.name }}</span>
              </div>
<!--            </div>-->
          </div>
        </div>
      </template>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "../components/AppLayout.vue";
import {useMentors} from "../composable/useMentors.js";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const mentor = ref()
const mentorsStore = useMentors()
const route = useRoute()

onMounted(() => {
  mentorsStore.fetchOne(route.params.slug)
    .then(response => {
      mentor.value = response.data.data
    })
})
</script>
