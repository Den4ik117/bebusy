<template>
  <AppAdminContainer title="Список требований">
    <template #header>
      <RouterLink :to="{ name: 'admin.requirements.create' }">
        <n-button type="primary" size="small">
          Создать требование
        </n-button>
      </RouterLink>
    </template>

    <n-table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Направление</th>
        <th>Навык</th>
        <th class="!text-right">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="requirement in requirements">
        <td>{{ requirement.id }}</td>
        <td>{{ requirement.direction.name }}</td>
        <td>{{ requirement.skill.name }}</td>
        <td>
          <AppAdminTableActions
            :id="requirement.id"
            :to="{ name: 'admin.requirements.edit', params: { id: requirement.id } }"
            text="Вы уверены, что хотите удалить вопрос?"
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
import {requirements, useRequirements} from "../composable/useRequirements.js";
import AppAdminContainer from "../components/AppAdminContainer.vue";
import AppAdminTableActions from "../components/AppAdminTableActions.vue";

const requirementsStore = useRequirements()

const handleDeleteClick = (id) => {
  requirementsStore.destroy(id).then(() => requirementsStore.fetch())
}

onMounted(() => {
  requirementsStore.fetch()
})
</script>