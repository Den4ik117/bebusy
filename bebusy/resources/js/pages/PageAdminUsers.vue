<template>
  <AppAdminContainer title="Список пользователей">
    <template #header>
<!--      <RouterLink :to="{ name: 'admin.users.create' }">-->
        <n-button type="primary" size="small">
          Создать пользователя
        </n-button>
<!--      </RouterLink>-->
    </template>

    <n-table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Пользователь</th>
        <th>Почта</th>
        <th>Ментор</th>
        <th class="!text-right">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users">
        <td>{{ user.id }}</td>
        <td>{{ user.full_name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <n-checkbox
            :checked="user.mentor !== null"
            disabled
          />
        </td>
        <td>
<!--          <AppAdminTableActions-->
<!--            :id="user.id"-->
<!--            :to="{ name: 'admin.users.edit', params: { id: user.id } }"-->
<!--            text="Вы уверены, что хотите удалить ментора?"-->
<!--            @destroy="handleDeleteClick"-->
<!--          />-->
        </td>
      </tr>
      </tbody>
    </n-table>
  </AppAdminContainer>
</template>

<script setup>
import { onMounted } from "vue";
import AppAdminContainer from "../components/AppAdminContainer.vue";
import AppAdminTableActions from "../components/AppAdminTableActions.vue";
import {users, useUsers} from "@/composable/useUsers.js";

const usersStore = useUsers()

const handleDeleteClick = (id) => {
  usersStore.destroy(id).then(() => usersStore.fetch())
}

onMounted(() => {
  usersStore.fetch()
})
</script>