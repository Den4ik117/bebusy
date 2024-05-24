<template>
  <AppAdminContainer
    :title="isEdit ? 'Редактирование заявки' : 'Создание заявки'"
    :back="{ name: 'admin.requests' }"
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
        label="Пользователь"
        path="full_name"
      >
        <n-input
          :value="formValue.full_name"
          disabled
        />
      </n-form-item>
      <n-form-item
        label="Введите дополнетельные данные"
        path="extra"
      >
        <n-input
          v-model:value="formValue.extra"
          type="textarea"
          placeholder="Дополнительные данные"
          disabled
        />
      </n-form-item>

      <n-form-item
        label="Тип"
        path="type"
      >
        <n-select
          v-model:value="formValue.type"
          placeholder="Навык"
          :options="types"
          label-field="name"
          value-field="id"
          disabled
        />
      </n-form-item>

      <n-form-item
        label="Выберите состояние"
        path="state"
      >
        <n-select
          v-model:value="formValue.state"
          placeholder="Состояние"
          :options="states"
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
import AppAdminContainer from "../components/AppAdminContainer.vue";
import {useRequests} from "../composable/useRequests.js";
import {RequestState, RequestStateTranslates, RequestType, RequestTypeTranslates} from "../types.js";

const formRef = ref(null)
const formValue = reactive({
  full_name: null,
  extra: null,
  type: null,
  state: null,
})
const message = useMessage()
const requestsStore = useRequests()
const route = useRoute()
/** @type {import('naive-ui').FormRules} */
const rules = {
  full_name: {
    required: true,
    message: 'Введите фамилию и имя пользователя',
  },
  extra: {
    required: true,
    message: 'Введите дополнительные данные заявки',
  },
  type: {
    required: true,
    message: 'Выберите тип заявки',
  },
  state: {
    required: true,
    message: 'Выберите состояние заявки',
  },
}

const isEdit = route.name === 'admin.requests.edit'

const clearForm = () => {
  formValue.full_name = null
  formValue.extra = null
  formValue.type = null
  formValue.state = null
}

const callback = () => {
  !isEdit && clearForm()
}

const handleValidateClick = async () => {
  try {
    await formRef.value?.validate()

    isEdit
      ? requestsStore.edit(route.params.uuid, formValue).then(callback)
      : requestsStore.create(formValue).then(callback)
  } catch (e) {
    message.error('Пожалуйста, исправьте ошибки в форме')
  }
}

const types = Object.values(RequestType).map(type => ({
  id: type,
  name: RequestTypeTranslates[type],
}))

const states = Object.values(RequestState).map(state => ({
  id: state,
  name: RequestStateTranslates[state],
}))

onMounted(() => {
  isEdit && requestsStore.fetchOne(route.params.uuid)
    .then((response) => {
      const request = response.data.data

      formValue.full_name = request.user.full_name
      formValue.extra = request.extra
      formValue.type = request.type
      formValue.state = request.state
    })
})
</script>
