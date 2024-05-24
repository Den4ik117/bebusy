<template>
  <AppLayout>
    <div class="p-2">
      <template v-if="question">
        <h1 class="text-2xl font-medium">{{ question.question }}</h1>
        <div
          class="mt-3"
          v-html="question.answer"
        ></div>
      </template>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "../components/AppLayout.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useQuestions} from "../composable/useQuestions.js";

const question = ref()
const questionsStore = useQuestions()
const route = useRoute()

onMounted(() => {
  questionsStore.fetchOne(route.params.id)
    .then(response => {
      question.value = response.data.data
    })
})
</script>
