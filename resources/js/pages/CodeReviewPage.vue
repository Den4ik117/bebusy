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
                            @click="setPage('request-code-review')"
                        >
                            <span class="bg-orange-500 rounded-md flex items-center justify-center w-8 h-8">
                                <i class="bi bi-pencil-square text-xl"></i>
                            </span>
                            <span class="text-xs text-left">Заявка на код-ревью</span>
                            <i class="bi bi-chevron-right text-xs"></i>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">Почему это так важно</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <span>
                        Проведение код-ревью в разработке программного обеспечения имеет фундаментальное значение.
                        Во-первых, это позволяет выявлять и устранять ошибки и недочеты в коде до его интеграции, повышая тем самым качество программного продукта.
                        Во-вторых, код-ревью способствует обмену знаний и опыта между членами команды, поддерживая профессиональный рост.
                        Третье, этот процесс гарантирует соблюдение стандартов кодирования и использование лучших практик разработки.
                        <br>
                        <br>
                        Кроме того, через код-ревью выявляются и устраняются потенциальные уязвимости в безопасности, что способствует повышению надежности программного продукта. Наконец, код-ревью помогает сократить время разработки, предотвращая возможные задержки и переработки на более поздних этапах проекта.
                    </span>
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">Проведение код-ревью</h3>
                <div class="rounded bg-[#2c2c2c] text-sm flex flex-col gap-4">
                    <iframe
                        class="w-full h-64 rounded"
                        src="https://www.youtube.com/embed/xiEee5tldRQ?si=LahYVNCxncfRIXxX"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        </div>
    </SimplePageLayout>
</template>

<script setup>
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
