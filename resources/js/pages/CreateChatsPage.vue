<template>
    <SimplePageLayout title="Создание чатов">
        <template v-if="form.is_group" #right>
            <button
                class="text-sm text-gray-300 font-medium p-1 rounded hover:text-gray-400"
                type="button"
                @click="createChat"
            >Создать</button>
        </template>

        <div class="flex flex-col gap-3">
            <div class="flex justify-between gap-2 items-center">
                <span class="text-sm">Создать группу</span>
                <AppleCheckbox v-model:value="form.is_group"/>
            </div>

            <div v-show="form.is_group" class="-mx-1 mb-2 flex flex-col gap-1">
                <label
                    for="form-full-name"
                    class="block uppercase text-xs text-gray-500 ml-2"
                >Название группы</label>
                <input
                    id="form-full-name"
                    class="bg-[#2c2c2c] rounded-md border border-[#2c2c2c] text-sm px-2 py-2"
                    type="text"
                    v-model="form.name"
                    placeholder="Введите название группы"
                >
            </div>

            <ul class="flex -mx-4 flex-col overflow-hidden bg-[#2c2c2c]">
                <template v-for="(user, index) in users" :key="user.id">
                    <li v-if="form.is_group">
                        <label
                            class="w-full grid grid-cols-[min-content_min-content_1fr] cursor-pointer select-none items-center gap-2 p-2 hover:bg-[#282828]"
                            :for="`form-user-ids-${user.id}`"
                        >
                            <input
                                :id="`form-user-ids-${user.id}`"
                                class="hidden"
                                type="checkbox"
                                name="user_ids[]"
                                :value="user.id"
                                v-model="form.user_ids"
                            >
                            <span
                                class="w-4 h-4 rounded-full border flex items-center transition justify-center"
                                :class="{ 'border-gray-500': !form.user_ids.includes(user.id), 'bg-blue-400 border-blue-400': form.user_ids.includes(user.id) }"
                            >
                                <i
                                    class="bi bi-check text-sm transition"
                                    :class="{ 'opacity-0': !form.user_ids.includes(user.id), 'opacity-1': form.user_ids.includes(user.id) }"
                                ></i>
                            </span>
                            <span class="rounded-md flex items-center justify-center w-8 h-8" :class="{ [backgroundColors[index % 3]]: true }">
                                <span class="font-bold uppercase">{{ user.lastName[0] }}{{ user.firstName[0] }}</span>
                            </span>
                            <span class="flex flex-col gap-0.5">
                                <span class="text-xs text-left font-medium">{{ user.lastName }} {{ user.firstName }} {{ user.is_bot ? '[БОТ]' : '' }}</span>
                                <span class="text-xs text-left text-gray-500">Был(а) в сети неизвестно когда</span>
                            </span>
                        </label>
                    </li>
                    <li v-else>
                        <button
                            class="w-full grid grid-cols-[min-content_1fr_min-content] items-center gap-2 p-2 hover:bg-[#282828]"
                            type="button"
                            @click="createChat(user.id)"
                        >
                                <span class="rounded-md flex items-center justify-center w-8 h-8" :class="{ [backgroundColors[index % 3]]: true }">
                                    <span class="font-bold uppercase">{{ user.lastName[0] }}{{ user.firstName[0] }}</span>
                                </span>
                            <span class="flex flex-col gap-0.5">
                                <span class="text-xs text-left font-medium">{{ user.lastName }} {{ user.firstName }} {{ user.is_bot ? '[БОТ]' : '' }}</span>
                                <span class="text-xs text-left text-gray-500">Был(а) в сети неизвестно когда</span>
                            </span>
                            <i class="bi bi-chevron-right text-xs"></i>
                        </button>
                    </li>
                    <li v-if="index !== users.length - 1">
                        <span class="block ml-auto h-px w-[calc(100%-48px)] bg-[#313131]"></span>
                    </li>
                </template>
            </ul>
        </div>
    </SimplePageLayout>
</template>

<script setup>
import SimplePageLayout from "@/components/SimplePageLayout.vue";
import AppleCheckbox from "@/components/AppleCheckbox.vue";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";

const users = ref([])
const form = reactive({
    name: '',
    user_id: null,
    user_ids: [],
    is_group: false,
})

const backgroundColors = [
    'bg-orange-500',
    'bg-blue-500',
    'bg-green-500',
]

const createChat = (id = null) => {
    form.user_id = typeof id === 'string' ? id : null

    axios.post('/api/chats', form)
        .then(() => {
            form.name = ''
            form.user_id = null
            form.user_ids = []
        })
        .catch(e => console.log(e))
}

onMounted(() => {
    fetch('/api/users')
        .then(data => data.json())
        .then(data => users.value = data.data)
        .catch(e => console.log(e))
})
</script>
