<template>
  <AppAdminContainer
    :title="isEdit ? 'Редактирование требования' : 'Создание требования'"
    :back="{ name: 'admin.requirements' }"
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
        label="Введите направление"
        path="direction_id"
      >
        <n-select
          v-model:value="formValue.direction_id"
          placeholder="Направление"
          :options="directions"
          label-field="name"
          value-field="id"
          clearable
          filterable
        />
      </n-form-item>

      <n-form-item
        label="Выберите навык"
        path="skill_id"
      >
        <n-select
          v-model:value="formValue.skill_id"
          placeholder="Навык"
          :options="skills"
          label-field="name"
          value-field="id"
          clearable
          filterable
        />
      </n-form-item>

      <n-form-item
        label="Выберите количество упоминаний"
        path="mentions"
      >
        <n-input-number
          class="w-full"
          v-model:value="formValue.mentions"
          placeholder="Количество упоминаний"
          clearable
        />
      </n-form-item>
    </n-form>
  </AppAdminContainer>
</template>

<script setup>
import {useMessage} from "naive-ui";
import { onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import AppAdminContainer from "../components/AppAdminContainer.vue";
import {skills, useSkills} from "../composable/useSkills.js";
import {directions, useDirections} from "../composable/useDirections.js";
import {useRequirements} from "../composable/useRequirements.js";

const formRef = ref(null)
const formValue = reactive({
  skill_id: null,
  direction_id: null,
  mentions: null,
})
const message = useMessage()
const requirementsStore = useRequirements()
const skillsStore = useSkills()
const directionsStore = useDirections()
const route = useRoute()
/** @type {import('naive-ui').FormRules} */
const rules = {
  skill_id: {
    required: true,
    message: 'Выберите навык',
  },
  direction_id: {
    required: true,
    message: 'Выберите направление',
  },
  mentions: {
    required: true,
    type: 'integer',
    message: 'Введите количество упоминаний',
  },
}

const isEdit = route.name === 'admin.requirements.edit'

const clearForm = () => {
  // formValue.direction_id = null
  formValue.skill_id = null
  formValue.mentions = null
}

const callback = () => {
  !isEdit && clearForm()
}

const handleValidateClick = async () => {
  try {
    await formRef.value?.validate()

    isEdit
      ? requirementsStore.edit(route.params.id, formValue).then(callback)
      : requirementsStore.create(formValue).then(callback)
  } catch (e) {
    message.error('Пожалуйста, исправьте ошибки в форме')
  }
}

onMounted(() => {
  skillsStore.fetch()
  directionsStore.fetch()

  isEdit && requirementsStore.fetchOne(route.params.id)
    .then((response) => {
      const requirement = response.data.data

      formValue.skill_id = requirement.skill_id
      formValue.direction_id = requirement.direction_id
      formValue.mentions = requirement.mentions
    })
})
</script>