<template>
    <SimplePageLayout title="Настройки">
        <template #right>
            <button
                class="text-sm text-gray-300 font-medium p-1 rounded hover:text-gray-400"
                type="button"
                @click="storeSettings"
            >Сохранить</button>
        </template>

        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
              <AppFormItem label="Фамилия" required>
                <n-input
                  v-model:value="form.last_name"
                  placeholder="Фамилия"
                />
              </AppFormItem>

              <AppFormItem label="Имя" required>
                <n-input
                  v-model:value="form.first_name"
                  placeholder="Имя"
                />
              </AppFormItem>

              <AppFormItem label="Отчество">
                <n-input
                  v-model:value="form.middle_name"
                  placeholder="Отчество"
                />
              </AppFormItem>

              <AppFormItem label="Telegram">
                <n-input
                  v-model:value="form.telegram"
                  placeholder="Ссылка на Telegram"
                />
              </AppFormItem>

              <AppFormItem label="GitHub">
                <n-input
                  v-model:value="form.github"
                  placeholder="Ссылка на GitHub"
                />
              </AppFormItem>
            </div>
        </div>
    </SimplePageLayout>
</template>

<script setup>
import SimplePageLayout from "@/components/SimplePageLayout.vue";
import {onMounted, reactive} from "vue";
import {me, useUsers} from "@/composable/useUsers.js";
import AppFormItem from "@/components/AppFormItem.vue";

const usersStore = useUsers()

const form = reactive({
    last_name: null,
    first_name: null,
    middle_name: null,
    telegram: null,
    github: null,
})

const storeSettings = () => {
  usersStore.updateMe(form)
}

onMounted(() => {
  form.last_name = me.value?.last_name
  form.first_name = me.value?.first_name
  form.middle_name = me.value?.middle_name
  form.telegram = me.value?.telegram
  form.github = me.value?.github
})
</script>
