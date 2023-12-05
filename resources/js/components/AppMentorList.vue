<template>
    <div class="flex flex-col gap-4">
        <AppMentorCard
            v-for="mentor in mentors"
            :key="mentor.id"
            :mentor="mentor"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import AppMentorCard from "@/components/AppMentorCard.vue";

const mentors = ref([
    {
        id: 1,
        name: 'Загвоздин Денис',
        image: 'https://img.freepik.com/free-photo/portrait-of-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699920000&semt=ais',
        position: 'Senior Full-Stack Developer',
        description: 'Я твой будущий наставник. Я senior fullstack разработчик. Работаю в Goodle 7 лет, был наставником 7324 человек.',
    },
    {
        id: 2,
        name: 'Андрюшин Петр',
        image: 'https://img.freepik.com/free-photo/portrait-of-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699920000&semt=ais',
        position: 'Senior Full-Stack Developer',
        description: 'Я твой будущий наставник. Я senior fullstack разработчик. Работаю в Goodle 7 лет, был наставником 7324 человек.',
    },
    {
        id: 3,
        name: 'Костюшкин Даниил',
        image: 'https://img.freepik.com/free-photo/portrait-of-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699920000&semt=ais',
        position: 'Senior Full-Stack Developer',
        description: 'Я твой будущий наставник. Я senior fullstack разработчик. Работаю в Goodle 7 лет, был наставником 7324 человек.',
    },
])
</script>