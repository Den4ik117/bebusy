<template>
  <AppAdminContainer
    :title="isEdit ? 'Редактирование вопроса' : 'Создание вопроса'"
    :back="{ name: 'admin.questions' }"
  >
    <template #header>
      <n-button @click="handleValidateClick" type="primary" size="small">
        Сохранить
      </n-button>
    </template>

    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
    >
      <n-form-item
        label="Введите вопрос"
        path="title"
      >
        <n-input
          v-model:value="formValue.question"
          placeholder="Вопрос"
        />
      </n-form-item>
      <n-form-item
        label="Введите развернутый ответ на вопрос"
        path="answer"
      >
        <n-input
          v-model:value="formValue.answer"
          type="textarea"
          placeholder="Развернутый ответ на вопрос"
        />
      </n-form-item>

      <n-form-item
        label="Выберите направление разработки"
        path="development_direction_id"
      >
        <n-select
          v-model:value="formValue.development_direction_id"
          placeholder="Направление разработки"
          :options="developmentDirections"
          label-field="name"
          value-field="id"
          clearable
          filterable
        />
      </n-form-item>

      <n-form-item
        label="Выберите тег"
        path="tag_id"
      >
        <n-select
          v-model:value="formValue.tag_id"
          placeholder="Тег"
          :options="tags"
          label-field="name"
          value-field="id"
          clearable
          filterable
        />
      </n-form-item>
    </n-form>
  </AppAdminContainer>
</template>

<script setup>
import {useMessage} from "naive-ui";
import { onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {tags, useTags} from "../composable/useTags.js";
import AppAdminContainer from "../components/AppAdminContainer.vue";
import {useQuestions} from "../composable/useQuestions.js";
import {developmentDirections, useDevelopmentDirections} from "../composable/useDevelopmentDirections.js";

const formRef = ref(null)
const formValue = reactive({
  question: null,
  answer: null,
  development_direction_id: null,
  tag_id: null,
})
const message = useMessage()
const questionsStore = useQuestions()
const tagsStore = useTags()
const developmentDirectionsStore = useDevelopmentDirections()
const route = useRoute()
/** @type {import('naive-ui').FormRules} */
const rules = {
  question: {
    required: true,
    message: 'Введите вопрос с собеседования',
  },
  answer: {
    required: true,
    message: 'Введите развернутый ответ на вопрос',
  },
  development_direction_id: {
    required: true,
    message: 'Введите направление разработки',
  },
  tag_id: {
    required: false,
    message: 'Выберите тег',
  },
}

const isEdit = route.name === 'admin.questions.edit'

const clearForm = () => {
  formValue.question = null
  formValue.answer = null
  formValue.development_direction_id = null
  formValue.tag_id = null
}

const callback = () => {
  !isEdit && clearForm()
}

const handleValidateClick = async () => {
  try {
    await formRef.value?.validate()

    isEdit
      ? questionsStore.edit(route.params.id, formValue).then(callback)
      : questionsStore.create(formValue).then(callback)
  } catch (e) {
    message.error('Пожалуйста, исправьте ошибки в форме')
  }
}

onMounted(() => {
  tagsStore.fetch()
  developmentDirectionsStore.fetch()

  isEdit && questionsStore.fetchOne(route.params.id)
    .then((response) => {
      const question = response.data.data

      formValue.question = question.question
      formValue.answer = question.answer
      formValue.development_direction_id = question.development_direction_id
      formValue.tag_id = question.tag_id
    })
})
</script>