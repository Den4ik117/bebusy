<template>
  <AppAdminContainer
    :title="isEdit ? 'Редактирование собеседования' : 'Создание собеседования'"
    :back="{ name: 'admin.interviews' }"
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
        label="Введите название собеседования"
        path="title"
      >
        <n-input
          v-model:value="formValue.title"
          placeholder="Название собеседования"
        />
      </n-form-item>
      <n-form-item
        label="Введите ссылку на видео"
        path="url"
      >
        <n-input
          v-model:value="formValue.url"
          placeholder="Ссылка на видео"
        />
      </n-form-item>

      <n-form-item
        label="Выберите направления"
        path="direction_id"
      >
        <n-select
          v-model:value="formValue.direction_id"
          placeholder="Направления"
          :options="directions"
          label-field="name"
          value-field="id"
          clearable
          filterable
        />
      </n-form-item>
      <n-form-item
        label="Выберите грейд"
        path="grade_id"
      >
        <n-select
          v-model:value="formValue.grade_id"
          placeholder="Грейд"
          :options="grades"
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
import {directions, useDirections} from "../composable/useDirections.js";
import {grades, useGrades} from "../composable/useGrades.js";
import AppAdminContainer from "../components/AppAdminContainer.vue";
import {useInterviews} from "../composable/useInterviews.js";

const formRef = ref(null)
const formValue = reactive({
  title: null,
  url: null,
  direction_id: null,
  grade_id: null,
})
const message = useMessage()
const interviewsStore = useInterviews()
const directionsStore = useDirections()
const gradesStore = useGrades()
const route = useRoute()
/** @type {import('naive-ui').FormRules} */
const rules = {
  title: {
    required: true,
    message: 'Введите название собеседования',
  },
  url: {
    required: true,
    message: 'Введите ссылку на видео с собеседованием',
  },
  direction_id: {
    required: true,
    message: 'Выберите направление',
  },
  grade_id: {
    required: true,
    message: 'Выберите грейд',
  },
}

const isEdit = route.name === 'admin.interviews.edit'

const clearForm = () => {
  formValue.title = null
  formValue.url = null
  formValue.direction_id = null
  formValue.grade_id = null
}

const callback = () => {
  !isEdit && clearForm()
}

const handleValidateClick = async () => {
  try {
    await formRef.value?.validate()

    isEdit
      ? interviewsStore.edit(route.params.id, formValue).then(callback)
      : interviewsStore.create(formValue).then(callback)
  } catch (e) {
    message.error('Пожалуйста, исправьте ошибки в форме')
  }
}

onMounted(() => {
  directionsStore.fetch()
  gradesStore.fetch()

  isEdit && interviewsStore.fetchOne(route.params.id)
    .then((response) => {
      const interview = response.data.data

      formValue.title = interview.title
      formValue.url = interview.url
      formValue.direction_id = interview.direction_id
      formValue.grade_id = interview.grade_id
    })
})
</script>