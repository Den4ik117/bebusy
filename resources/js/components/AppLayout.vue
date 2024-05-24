<template>
  <div class="lg:max-w-screen-lg mx-auto bg-[#212121] min-h-[100dvh] border-x border-[#0F0F0F] relative overflow-hidden">
    <div class="flex flex-col">
      <header class="py-2 border-b border-[#0F0F0F]">
        <ul class="flex gap-1">
          <li>
            <router-link
              class="text-white px-2 text-xs uppercase font-bold py-2"
              :class="{
                'underline': route.name === 'chats',
                'hover:underline': route.name !== 'chats',
              }"
              :to="{ name: 'chats' }"
            >Личный кабинет и чаты</router-link>
          </li>
          <li>
            <router-link
              class="text-white px-2 text-xs uppercase font-bold py-2"
              :class="{
                'underline': ['mentors.show', 'mentors'].includes(route.name),
                'hover:underline': !['mentors.show', 'mentors'].includes(route.name),
              }"
              :to="{ name: 'mentors' }"
            >Менторы</router-link>
          </li>
          <li>
            <router-link
              class="text-white px-2 text-xs uppercase font-bold py-2"
              :class="{
                'underline': route.name === 'interviews',
                'hover:underline': route.name !== 'interviews',
              }"
              :to="{ name: 'interviews' }"
            >Собеседования</router-link>
          </li>
          <li>
            <router-link
              class="text-white px-2 text-xs uppercase font-bold py-2"
              :class="{
                'underline': ['questions', 'questions.show'].includes(route.name),
                'hover:underline': !['questions', 'questions.show'].includes(route.name),
              }"
              :to="{ name: 'questions' }"
            >Вопросы</router-link>
          </li>
          <li>
            <router-link
              class="text-white px-2 text-xs uppercase font-bold py-2"
              :class="{
                'underline': route.name === 'requirements',
                'hover:underline': route.name !== 'requirements',
              }"
              :to="{ name: 'requirements' }"
            >Требования</router-link>
          </li>
        </ul>
      </header>

      <slot/>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";

const route = useRoute()
</script>
