<template>
  <div class="lg:max-w-screen-lg mx-auto bg-[#212121] h-[100dvh] border-x border-[#0F0F0F] relative overflow-hidden">
    <div class="md:grid block grid-cols-[250px_1fr] min-h-screen">
      <div class="md:flex hidden flex-col border-r border-[#0F0F0F]">
        <RouterLink class="flex items-center gap-2 px-4 py-4 select-none" :to="{ name: 'admin.dashboard' }">
          <img :src="Logo" alt="Логотип" width="24">
          <span class="text-sm font-bold">Панель администратора</span>
        </RouterLink>

        <AppAdminMenu/>
      </div>

      <transition name="overlay">
        <div
          v-if="isOpenMenu"
          class="md:hidden absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-10"
          @click="isOpenMenu = false"
        ></div>
      </transition>

      <transition name="menu">
        <div
          v-if="isOpenMenu"
          class="md:hidden flex absolute top-0 left-0 bottom-0 z-20 bg-[#212121] flex-col border-r border-[#0F0F0F]"
        >
          <RouterLink class="flex items-center gap-2 px-4 py-4 select-none" :to="{ name: 'admin.dashboard' }">
            <img :src="Logo" alt="Логотип" width="24">
            <span class="text-sm font-bold">Панель администратора</span>
          </RouterLink>

          <AppAdminMenu/>
        </div>
      </transition>

      <div class="bg-[#232323] bg-opacity-100 w-full h-full">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from '../../images/Logo.svg'
import AppAdminMenu from "./AppAdminMenu.vue";
import {isOpenMenu} from "../composable/useUsers.js";
</script>
