<template>
  <AppLayout>
    <div class="flex flex-col gap-2 p-2">
      <n-select
        v-model:value="filters.direction_id"
        placeholder="Выберите направление"
        :options="directions"
        label-field="name"
        value-field="id"
        clearable
        filterable
      />

      <n-table v-if="requirements.length > 0">
        <thead>
        <tr>
          <th>№</th>
          <th>Навык</th>
          <th>Упоминаний</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(requirement, index) in requirements" :key="requirement.id">
          <td>{{ index + 1 }}</td>
          <td>{{ requirement.skill.name }}</td>
          <td>{{ requirement.mentions }}</td>
        </tr>
        </tbody>
      </n-table>
      <div v-else>Пожалуйста, выберите требование</div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "../components/AppLayout.vue";
import {onMounted, reactive, watch} from "vue";
import {requirements, useRequirements} from "../composable/useRequirements.js";
import {directions, useDirections} from "../composable/useDirections.js";

const requirementsStore = useRequirements()
const directionsStore = useDirections()
const filters = reactive({
  direction_id: null,
})

watch(filters, () => {
  requirementsStore.fetch({
    direction_id: filters.direction_id,
  })
})

onMounted(() => {
  directionsStore.fetch()
})
</script>
