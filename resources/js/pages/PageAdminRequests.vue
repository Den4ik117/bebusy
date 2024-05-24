<template>
  <AppAdminContainer title="Список заявок">
<!--    <template #header>-->
<!--      <RouterLink :to="{ name: 'admin.requirements.create' }">-->
<!--        <n-button type="primary" size="small">-->
<!--          Создать требование-->
<!--        </n-button>-->
<!--      </RouterLink>-->
<!--    </template>-->

    <n-table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Пользователь</th>
        <th>Тип</th>
        <th>Состояние</th>
        <th class="!text-right">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="require in requests">
        <td>{{ require.id }}</td>
        <td>{{ require.user.full_name }}</td>
        <td>{{ RequestTypeTranslates[require.type] }}</td>
        <td>
          <span
            class="text-xs font-bold px-2 py-1 rounded-full bg-blue-300 text-blue-700"
            :class="{
              [`bg-${RequestStateColors[require.state]}-300`]: true,
              [`text-${RequestStateColors[require.state]}-700`]: true,
            }"
          >{{ RequestStateTranslates[require.state] }}</span>
        </td>
        <td>
          <AppAdminTableActions
            :id="require.uuid"
            :to="{ name: 'admin.requests.edit', params: { uuid: require.uuid } }"
            text="Вы уверены, что хотите удалить запрос?"
            @destroy="handleDeleteClick"
          />
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
import {requests,useRequests} from "../composable/useRequests.js";
import {RequestStateColors, RequestStateTranslates, RequestTypeTranslates} from "../types.js";

const requestsStore = useRequests()

const handleDeleteClick = (uuid) => {
  requestsStore.destroy(uuid).then(() => requestsStore.fetch())
}

onMounted(() => {
  requestsStore.fetch()
})
</script>
