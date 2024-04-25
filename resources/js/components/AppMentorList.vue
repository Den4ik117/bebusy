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
import {onMounted, ref} from "vue";
import AppMentorCard from "@/components/AppMentorCard.vue";
import axios from "axios";

const mentors = ref([])

const fetchMentors = async () => {
    axios.get('/api/mentors').then(response => mentors.value = response.data.data)
}

onMounted(() => {
    fetchMentors()
})
</script>