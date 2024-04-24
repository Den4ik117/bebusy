<template>
  <div class="flex items-center justify-end gap-2">
    <RouterLink :to="to">
      <n-button type="warning" size="tiny">
        Редактировать
      </n-button>
    </RouterLink>
    <n-popconfirm
      positive-text="Удалить"
      negative-text="Отмена"
      @positive-click="emit('destroy', id)"
    >
      <template #trigger>
        <n-button type="error" size="tiny">
          Удалить
        </n-button>
      </template>

      {{ text }}
    </n-popconfirm>
  </div>
</template>

<script setup>
defineProps({
  id: Number,
  to: Object,
  text: String,
})

const emit = defineEmits(['destroy'])
</script>