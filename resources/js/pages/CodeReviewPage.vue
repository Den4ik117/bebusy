<template>
    <SimplePageLayout title="Код-ревью">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">О код-ревью</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <span>
                        Код-ревью в программировании представляет собой практику, при которой другие разработчики внимательно изучают и анализируют написанный код с целью выявления ошибок, улучшения качества и обмена знаниями. Этот процесс способствует выявлению потенциальных проблем, повышению читаемости кода и обеспечивает согласованность стилей написания. Код-ревью является важной частью разработки программного обеспечения, способствующей повышению надежности и эффективности кода.
                    </span>
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">Как это работает</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <span>
                        На GitHub код-ревью осуществляется через создание Pull Request. Другие разработчики изучают изменения, предлагают улучшения, выявляют ошибки. После обсуждения и корректировок код сливается в основную ветку проекта для обеспечения качества и согласованности.
                    </span>
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
                                <i class="bi bi-pencil-square text-xl"></i>
                            </span>
                            <span class="text-xs text-left">Заявка на код-ревью</span>
                            <i class="bi bi-chevron-right text-xs"></i>
                        </button>
                    </li>
<!--                    <li>-->
<!--                        <span class="block ml-auto h-px w-[calc(100%-48px)] bg-[#313131]"></span>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <button-->
<!--                            class="w-full grid grid-cols-[min-content_1fr_min-content] items-center gap-2 p-2 hover:bg-[#282828]"-->
<!--                            type="button"-->
<!--                            @click="setPage('become-mentor')"-->
<!--                        >-->
<!--                            <span class="bg-green-500 rounded-xl flex items-center justify-center w-8 h-8">-->
<!--                                <i class="bi bi-person-plus-fill text-xl"></i>-->
<!--                            </span>-->
<!--                            <span class="text-xs text-left">Хочу быть наставником</span>-->
<!--                            <i class="bi bi-chevron-right text-xs"></i>-->
<!--                        </button>-->
<!--                    </li>-->
                </ul>
            </div>
        </div>
    </SimplePageLayout>
</template>

<script setup>
import SimpleHeader from "@/components/SimpleHeader.vue";
import AppMentorList from "@/components/AppMentorList.vue";
import SimplePageLayout from "@/components/SimplePageLayout.vue";
import {useStore} from "vuex";

const store = useStore()

const setPage = (page) => {
    store.commit({
        type: 'setPage',
        value: page,
    })
}
</script>
