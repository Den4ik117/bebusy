<template>
    <SimplePageLayout title="Заявка на ментора" back="mentoring">
        <template #right>
            <button
                class="text-sm text-gray-300 font-medium p-1 rounded hover:text-gray-400"
                type="button"
                @click="createRequest"
            >Создать</button>
        </template>

        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
                <div class="-mx-1 flex flex-col gap-1">
                    <label
                        for="form-full-name"
                        class="block uppercase text-xs text-gray-500 ml-2"
                    >ФИО</label>
                    <input
                        id="form-full-name"
                        class="bg-[#2c2c2c] rounded-md border border-[#2c2c2c] text-sm px-2 py-2"
                        type="text"
                        v-model="form.full_name"
                        placeholder="ФИО"
                    >
                </div>

                <div class="-mx-1 flex flex-col gap-1">
                    <label
                        for="form-birthdate"
                        class="block uppercase text-xs text-gray-500 ml-2"
                    >Дата рождения</label>
                    <input
                        id="form-birthdate"
                        class="bg-[#2c2c2c] rounded-md border border-[#2c2c2c] text-sm px-2 py-2"
                        type="date"
                        v-model="form.birthdate"
                        placeholder="Дата рождения"
                    >
                </div>

                <div class="-mx-1 flex flex-col gap-1">
                    <label
                        for="form-direction-id"
                        class="block uppercase text-xs text-gray-500 ml-2"
                    >Выберите направление</label>
                    <select
                        id="form-direction-id"
                        class="bg-[#2c2c2c] rounded-md border border-[#2c2c2c] text-sm px-2 py-2 outline-none"
                        v-model="form.direction_id"
                    >
                        <option value="">Выберите направление</option>
                        <option
                            v-for="direction in directions"
                            :key="direction.id"
                            :value="direction.id"
                        >{{ direction.name }}</option>
                    </select>
                </div>

                <div class="-mx-1 flex flex-col gap-1">
                    <label
                        for="form-about"
                        class="block uppercase text-xs text-gray-500 ml-2"
                    >Расскажите о себе</label>
                    <textarea
                        id="form-about"
                        class="bg-[#2c2c2c] rounded-md border border-[#2c2c2c] text-sm px-2 py-2 resize-none"
                        placeholder="Расскажите о себе"
                        v-model="form.about"
                        :rows="dynamicRows"
                    ></textarea>
                </div>
            </div>
        </div>
    </SimplePageLayout>
</template>

<script setup>
import SimplePageLayout from "@/components/SimplePageLayout.vue";
import AppMentorList from "@/components/AppMentorList.vue";
import AppInput from "@/components/AppInput.vue";
import {computed, onMounted, reactive, ref} from "vue";
import axios from "axios";

const directions = ref([])
const form = reactive({
    full_name: '',
    birthdate: '',
    direction_id: '',
    about: '',
    is_mentor: false,
})

const dynamicRows = computed(() => {
    const rows = form.about.split('\n').length

    return rows > 3 ? rows : 3
})

const createRequest = () => {
    axios.post('/api/requests', form)
        .then(data => {
            form.full_name = ''
            form.birthdate = ''
            form.direction_id = ''
            form.about = ''
        })
        .catch(e => console.log(e))
}

onMounted(() => {
    fetch('/api/directions')
        .then(data => data.json())
        .then(data => directions.value = data.data)
        .catch(e => console.log(e))
})
</script>
