<template>
  <AppAdminContainer
    :title="isEdit ? 'Редактирование пользователя' : 'Создание пользователя'"
    :back="{ name: 'admin.users' }"
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
        label="Введите имя"
        path="first_name"
      >
        <n-input
          v-model:value="formValue.first_name"
          placeholder="Имя"
        />
      </n-form-item>
      <n-form-item
        label="Введите отчество"
        path="middle_name"
      >
        <n-input
          v-model:value="formValue.middle_name"
          placeholder="Отчество"
        />
      </n-form-item>
      <n-form-item
        label="Введите фамилию"
        path="last_name"
      >
        <n-input
          v-model:value="formValue.last_name"
          placeholder="Фамилия"
        />
      </n-form-item>
      <n-form-item
        label="Введите электронную почту"
        path="email"
      >
        <n-input
          v-model:value="formValue.email"
          placeholder="Электронная почта"
        />
      </n-form-item>
      <n-form-item
        label="Введите Telegram"
        path="telegram"
      >
        <n-input
          v-model:value="formValue.telegram"
          placeholder="Telegram"
        />
      </n-form-item>
      <n-form-item
        label="Введите GitHub"
        path="github"
      >
        <n-input
          v-model:value="formValue.github"
          placeholder="GitHub"
        />
      </n-form-item>

      <n-form-item
        label="Выберите роль"
        path="role"
      >
        <n-select
          v-model:value="formValue.role"
          placeholder="Роль"
          :options="rolesOptions"
          clearable
        />
      </n-form-item>

      <n-form-item
        label="Выберите аватар"
        path="avatar_url"
      >
        <n-upload
          v-model:file-list="fileList"
          list-type="image-card"
          :max="1"
          accept="image/*"
          @before-upload="uploadAvatar"
        >
          Загрузить фото
        </n-upload>
      </n-form-item>
    </n-form>
  </AppAdminContainer>
</template>

<script setup>
import {useMessage} from "naive-ui";
import { onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import AppAdminContainer from "../components/AppAdminContainer.vue";
import {useUsers} from "@/composable/useUsers.js";
import {UserRoleEnum, UserRoleEnumTranslates} from "@/types.js";
import {useAvatars} from "../composable/useAvatars.js";

const formRef = ref(null)
const fileList = ref([])
const formValue = reactive({
  first_name: null,
  middle_name: null,
  last_name: null,
  email: null,
  telegram: null,
  github: null,
  role: null,
  avatar_url: null,
})
const message = useMessage()
const usersStore = useUsers()
const avatarsStore = useAvatars()
const route = useRoute()
/** @type {import('naive-ui').FormRules} */
const rules = {
  first_name: {
    required: true,
    message: 'Введите имя пользователь',
  },
  last_name: {
    required: true,
    message: 'Введите фамилию пользователя',
  },
  email: {
    required: true,
    message: 'Введите электронную почту пользователя',
  },
  role: {
    required: true,
    message: 'Выберите роль пользователя',
  },
}

const isEdit = route.name === 'admin.users.edit'

const clearForm = () => {
  formValue.first_name = null
  formValue.middle_name = null
  formValue.last_name = null
  formValue.email = null
  formValue.telegram = null
  formValue.github = null
  formValue.role = null
  formValue.avatar_url = null
  fileList.value = []
}

const callback = () => {
  !isEdit && clearForm()
}

const rolesOptions = Object.values(UserRoleEnum).map((role) => ({
  label: UserRoleEnumTranslates[role],
  value: role,
}))

const handleValidateClick = async () => {
  try {
    await formRef.value?.validate()

    isEdit
      ? usersStore.update(route.params.id, formValue).then(callback)
      : usersStore.create(formValue).then(callback)
  } catch (e) {
    message.error('Пожалуйста, исправьте ошибки в форме')
  }
}

const uploadAvatar = async (e) => {
  await avatarsStore.upload(e.file.file)
    .then(response => {
      formValue.avatar_url = response.data.data.url
      fileList.value = [{
        id: 1,
        name: response.data.data.url,
        status: 'finished',
        url: response.data.data.url,
      }]
    })

  return false
}

onMounted(() => {
  isEdit && usersStore.fetchOne(route.params.id)
    .then((response) => {
      const user = response.data.data

      formValue.first_name = user.first_name
      formValue.middle_name = user.middle_name
      formValue.last_name = user.last_name
      formValue.email = user.email
      formValue.telegram = user.telegram
      formValue.github = user.github
      formValue.role = user.role
      formValue.avatar_url = user.avatar_url
      fileList.value = user.avatar_url ? [{
        id: 1,
        name: user.avatar_url,
        status: 'finished',
        url: user.avatar_url,
      }] : []
    })
})
</script>
