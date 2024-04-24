<template>
  <AppAdminContainer
    :title="isEdit ? 'Редактирование ментора' : 'Создание ментора'"
    :back="{ name: 'admin.mentors' }"
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
      <n-form-item label="Выберите пользователя" path="user_id">
        <n-select
          v-model:value="formValue.user_id"
          :options="users"
          value-field="id"
          label-field="full_name"
          placeholder="Иванов Иван"
          clearable
          filterable
        />
      </n-form-item>
      <n-form-item
        label="Занимаемая должность"
        path="job_title"
      >
        <n-input
          v-model:value="formValue.job_title"
          placeholder="Middle Python Developer"
        />
      </n-form-item>
      <n-form-item
        label="Опыт работы"
        path="experience"
      >
        <n-input
          v-model:value="formValue.experience"
          placeholder="2 года"
        />
      </n-form-item>
      <n-form-item
        label="Введите цену за полчаса, руб."
        path="price_per_half_hour"
      >
        <n-input-number
          class="w-full"
          v-model:value="formValue.price_per_half_hour"
          placeholder="500"
        />
      </n-form-item>
      <n-form-item
        label="Введите цену за час, руб."
        path="price_per_hour"
      >
        <n-input-number
          class="w-full"
          v-model:value="formValue.price_per_hour"
          placeholder="1000"
        />
      </n-form-item>
      <n-form-item
        label="Введите рассказ о менторе"
        path="about"
      >
        <n-input
          v-model:value="formValue.about"
          type="textarea"
          placeholder="Обо мне..."
        />
      </n-form-item>
      <n-form-item
        label="Выберите направления"
        path="directions_ids"
      >
        <n-select
          v-model:value="formValue.directions_ids"
          placeholder="Направления"
          :options="directions"
          label-field="name"
          value-field="id"
          multiple
          clearable
          filterable
        />
      </n-form-item>
      <n-form-item
        label="Выберите услуги"
        path="services_ids"
      >
        <n-select
          v-model:value="formValue.services_ids"
          placeholder="Могу помочь"
          :options="services"
          label-field="name"
          value-field="id"
          multiple
          clearable
          filterable
        />
      </n-form-item>
      <n-form-item
        label="Выберите навыки"
        path="skills_ids"
      >
        <n-select
          v-model:value="formValue.skills_ids"
          placeholder="Навыки"
          :options="skills"
          label-field="name"
          value-field="id"
          multiple
          clearable
          filterable
        />
      </n-form-item>
    </n-form>
  </AppAdminContainer>
</template>

<script setup>
import {useMessage} from "naive-ui";
import {computed, onMounted, reactive, ref} from "vue";
import { users, useUsers } from '../composable/useUsers.js'
import {useMentors} from "../composable/useMentors.js";
import {useRoute} from "vue-router";
import {directions, useDirections} from "../composable/useDirections.js";
import {services, useServices} from "../composable/useServices.js";
import {skills, useSkills} from "../composable/useSkills.js";
import AppAdminContainer from "../components/AppAdminContainer.vue";

const formRef = ref(null)
const formValue = reactive({
  slug: null,
  user_id: null,
  job_title: null,
  experience: null,
  price_per_half_hour: null,
  price_per_hour: null,
  about: null,
  directions_ids: null,
  services_ids: null,
  skills_ids: null,
})
const message = useMessage()
const usersStore = useUsers()
const mentorsStore = useMentors()
const directionsStore = useDirections()
const servicesStore = useServices()
const skillsStore = useSkills()
const route = useRoute()
/** @type {import('naive-ui').FormRules} */
const rules = {
  user_id: {
    required: true,
    message: 'Выберите пользователя',
  },
  job_title: {
    required: true,
    message: 'Введите должность',
  },
  experience: {
    required: true,
    message: 'Введите опыт',
  },
  price_per_half_hour: {
    required: true,
    type: 'number',
    message: 'Введите корректную цену за полчаса',
  },
  price_per_hour: {
    required: true,
    type: 'number',
    message: 'Введите корректную цену за час',
  },
  about: {
    required: true,
    message: 'Расскажите о менторе',
  },
  directions_ids: {
    required: true,
    type: 'array',
    message: 'Выберите направления',
  },
  services_ids: {
    required: true,
    type: 'array',
    message: 'Выберите услуги',
  },
  skills_ids: {
    required: true,
    type: 'array',
    message: 'Выберите навыки',
  },
}

const isEdit = route.name === 'admin.mentors.edit'

const clearForm = () => {
  formValue.slug = null
  formValue.user_id = null
  formValue.job_title = null
  formValue.experience = null
  formValue.price_per_half_hour = null
  formValue.price_per_hour = null
  formValue.about = null
  formValue.directions_ids = null
  formValue.services_ids = null
  formValue.skills_ids = null
}

const callback = () => {
  !isEdit && clearForm()

  usersStore.fetch({
    is_not_mentor: Number(!isEdit),
  })
}

const handleValidateClick = async () => {
  try {
    await formRef.value?.validate()

    isEdit
      ? mentorsStore.edit(route.params.id, formValue).then(callback)
      : mentorsStore.create(formValue).then(callback)
  } catch (e) {
    message.error('Пожалуйста, исправьте ошибки в форме')
  }
}

onMounted(() => {
  usersStore.fetch({
    is_not_mentor: Number(!isEdit),
  })
  directionsStore.fetch()
  servicesStore.fetch()
  skillsStore.fetch()

  isEdit && mentorsStore.fetchOne(route.params.id)
    .then((response) => {
      const mentor = response.data.data

      formValue.slug = mentor.slug
      formValue.user_id = mentor.user_id
      formValue.job_title = mentor.job_title
      formValue.experience = mentor.experience
      formValue.price_per_half_hour = mentor.price_per_half_hour
      formValue.price_per_hour = mentor.price_per_hour
      formValue.about = mentor.about
      formValue.directions_ids = mentor.directions.map(direction => direction.id)
      formValue.services_ids = mentor.services.map(service => service.id)
      formValue.skills_ids = mentor.skills.map(skill => skill.id)
    })
})
</script>