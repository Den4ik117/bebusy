<template>
    <SimplePageLayout title="Настройки">
        <template #right>
            <button
                class="text-sm text-gray-300 font-medium p-1 rounded hover:text-gray-400"
                type="button"
                @click="storeSettings"
            >Сохранить</button>
        </template>

        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
                <div class="-mx-1 flex flex-col gap-1">
                    <label
                        for="form-full-name"
                        class="block uppercase text-xs text-gray-500 ml-2"
                    >Фамилия</label>
                    <input
                        id="form-full-name"
                        class="bg-[#2c2c2c] rounded-md border border-[#2c2c2c] text-sm px-2 py-2"
                        type="text"
                        v-model="form.last_name"
                        placeholder="Фамилия"
                    >
                </div>

                <div class="-mx-1 flex flex-col gap-1">
                    <label
                        for="form-full-name"
                        class="block uppercase text-xs text-gray-500 ml-2"
                    >Имя</label>
                    <input
                        id="form-full-name"
                        class="bg-[#2c2c2c] rounded-md border border-[#2c2c2c] text-sm px-2 py-2"
                        type="text"
                        v-model="form.first_name"
                        placeholder="Имя"
                    >
                </div>
            </div>
        </div>
    </SimplePageLayout>
</template>

<script setup>
import SimplePageLayout from "@/components/SimplePageLayout.vue";
import {useStore} from "vuex";
import {computed, reactive, watch} from "vue";
import axios from "axios";
import {getErrorMessage} from "@/utils";
import {useMessage} from "@/utils/useMessage";

const store = useStore()
const message = useMessage()

const me = computed(() => store.state.me)
const form = reactive({
    last_name: me.value?.last_name || '',
    first_name: me.value?.first_name || '',
})

watch(me, (user) => {
    form.last_name = user?.last_name || ''
    form.first_name = user?.first_name || ''
})

const storeSettings = () => {
    axios.patch('/api/me', form)
        .then(data => {
            store.commit({
                type: 'setMe',
                value: data.data.data,
            })

            message.success('Информация о пользователе успешно обновлена')
        })
        .catch(e => {
            message.error(getErrorMessage(e))
        })
}
</script>
