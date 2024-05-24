<template>
  <div class="grid grid-rows-[min-content_1fr] h-screen">
    <div class="flex items-center justify-between h-[57px] border-b border-[#0F0F0F] px-4">
      <div class="flex items-center gap-1">
        <button
          class="md:hidden block hover:bg-gray-200 hover:bg-opacity-20 p-1 rounded"
          type="button"
          @click="isOpenMenu = !isOpenMenu"
        >
          <i class="bi bi-list"></i>
        </button>

        <RouterLink
          v-if="back"
          class="hover:bg-gray-200 hover:bg-opacity-20 p-1 rounded"
          :to="back"
        >
          <i class="bi bi-chevron-left"></i>
        </RouterLink>
        <span class="font-bold text-sm">{{ title }}</span>
      </div>
      <div>
        <slot name="header"/>
      </div>
    </div>

    <div class="p-4 overflow-y-auto">
      <slot/>
    </div>
  </div>
</template>

<script setup>
import {isOpenMenu} from "../composable/useUsers.js";

defineProps({
  title: String,
  back: Object,
})
</script>
