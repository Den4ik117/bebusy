<template>
    <SimplePageLayout title="Менторство">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">О менторстве</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <span>
                        Менторство в программировании представляет собой отношение, при котором опытный программист, или ментор, оказывает поддержку и направление менее опытному коллеге, или менти. Этот процесс включает в себя обмен знаниями, навыками и опытом для помощи в профессиональном развитии менти.
                    </span>
                    <span>
                        Менторство способствует ускоренному обучению, повышению квалификации и развитию успешных практик в области программирования.
                    </span>
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">Как это работает</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <span>
                        Для того, чтобы воспользоваться услугой “Менторство” вам необходимо выбрать наставника и заполнить форму ниже. Далее в течение 24-х часов с вами свяжется ваш наставник, добавит вас в общую группу команды и вы приступите к выполнению индивидуального проекта.
                    </span>
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">Список наставников</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <AppMentorList/>
                </div>
            </div>

            <div class="flex flex-col gap-1">
<!--                <h3 class="uppercase text-xs text-gray-500"></h3>-->
                <ul class="flex flex-col rounded overflow-hidden bg-[#2c2c2c]">
                    <li>
                        <button
                            class="w-full grid grid-cols-[min-content_1fr_min-content] items-center gap-2 p-2 hover:bg-[#282828]"
                            type="button"
                            @click="setPage('find-mentor')"
                        >
                            <span class="bg-orange-500 rounded-md flex items-center justify-center w-8 h-8">
                                <i class="bi bi-plus-circle-fill text-xl"></i>
                            </span>
                            <span class="text-xs text-left">Хочу в команду к наставнику</span>
                            <i class="bi bi-chevron-right text-xs"></i>
                        </button>
                    </li>
                    <li>
                        <span class="block ml-auto h-px w-[calc(100%-48px)] bg-[#313131]"></span>
                    </li>
                    <li>
                        <button
                            class="w-full grid grid-cols-[min-content_1fr_min-content] items-center gap-2 p-2 hover:bg-[#282828]"
                            type="button"
                            @click="setPage('become-mentor')"
                        >
                            <span class="bg-green-500 rounded-xl flex items-center justify-center w-8 h-8">
                                <i class="bi bi-person-plus-fill text-xl"></i>
                            </span>
                            <span class="text-xs text-left">Хочу быть наставником</span>
                            <i class="bi bi-chevron-right text-xs"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </SimplePageLayout>
</template>

<script setup>
import SimplePageLayout from "@/components/SimplePageLayout.vue";
import AppMentorList from "@/components/AppMentorList.vue";
import {useStore} from "vuex";

const store = useStore()

const setPage = (page) => {
    store.commit({
        type: 'setPage',
        value: page,
    })
}
</script>
