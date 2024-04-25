<template>
  <div class="grid grid-cols-[240px_1fr] min-h-screen">
    <div class="flex flex-col border-r border-[#0F0F0F]">
      <RouterLink class="flex items-center gap-2 px-4 py-4 select-none" :to="{ name: 'admin.dashboard' }">
        <img :src="Logo" alt="Логотип" width="24">
        <span class="text-sm font-bold">Панель администратора</span>
      </RouterLink>

      <AppAdminMenu/>
    </div>
    <div
      class="bg-gray-300 bg-cover bg-center bg-no-repeat"
      :style="`background-image: url(${Background})`"
    >
      <div class="bg-[#232323] bg-opacity-100 w-full h-full">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Background from '../../images/Background-1.jpg'
import Logo from '../../images/Logo.svg'
import AppAdminMenu from "./AppAdminMenu.vue";
</script>
