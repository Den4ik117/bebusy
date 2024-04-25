<template>
  <div class="-mx-1 flex flex-col gap-1">
    <label class="block uppercase text-xs text-gray-500 ml-2">
      <span>{{ label }}</span>
      <span v-show="required" class="text-red-400 ml-0.5 select-none">*</span>
    </label>
    <slot/>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  required: Boolean,
})
</script>
