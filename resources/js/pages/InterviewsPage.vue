<template>
    <SimplePageLayout title="Собеседования">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">О собеседованиях</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <span>
                        Тестовое собеседование ― это пробное собеседование перед настоящим. Они необходимы для людей, которые в ближайшее время планируют устроиться на работу. Они помогают вспомнить все технические аспекты, а также улучшить свой моральный настрой и soft-skills.
                    </span>
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">Индивидуальные и групповые собеседования</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <span>
                        Индивидуальное собеседование будет проводиться лично с вашим наставником. Оно будет на основе настоящего собеседования, с реальными задачами и вопросами. Такое собеседование длится до 1 часа. Прорабатываются все навыки по направлению.
                    </span>
                    <span>
                        Групповые собеседования будут проводится с вашим наставником и группой людей в режиме онлайн-встречи. Оно будет на основе ответов на самые часто задаваемые вопросы. Разбор задач из реальных собеседования. Ссылка на конференцию оправляется Вам на почту в день встречи.
                    </span>
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">Расписание</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <span>
                        Индивидуальное собеседование проводится после работы под присмотром наставника. Выбирается удобное время для наставника и ученика. Собеседование длится до 1 часа.
                    </span>
                    <span>
                        Групповое собеседование проводится каждую субботу в 19:00 по МСК. На них могут присутствовать любой желающий.
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
                            @click="setPage('individual-interviews')"
                        >
                            <span class="bg-orange-500 rounded-md flex items-center justify-center w-8 h-8">
                                <i class="bi bi-person-fill text-xl"></i>
                            </span>
                            <span class="text-xs text-left">Запись на индивидуальное собеседование</span>
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
                            @click="setPage('group-interviews')"
                        >
                            <span class="bg-green-500 rounded-xl flex items-center justify-center w-8 h-8">
                                <i class="bi bi-people-fill text-xl"></i>
                            </span>
                            <span class="text-xs text-left">Запись на групповое собеседование</span>
                            <i class="bi bi-chevron-right text-xs"></i>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">Почему это так важно</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <span>
                        Пробные тестовые собеседования в IT предоставляют кандидатам возможность оценить свой уровень подготовки, разработать эффективные стратегии ответов и освоить стрессовые ситуации, эмулируя атмосферу реального интервью.
                        <br>
                        <br>
                        Полученная обратная связь после тестирования позволяет корректировать ошибки и улучшать подготовку, а также фокусироваться на решении специфических задач, что повышает шансы на успешное прохождение интервью.
                        <br>
                        <br>
                        Этот опыт помогает кандидатам формировать уверенность в себе и повышать свою конкурентоспособность на динамичном рынке труда в области информационных технологий.
                    </span>
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">Примеры собеседований</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <a
                        class="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-24 rounded px-6 flex items-center justify-center text-center"
                        href="https://youtu.be/gt-Glqr-1DM?si=sPFGLEAKMaxbJqu2"
                        target="_blank"
                    >
                        <span class="text-xs font-semibold">
                            Собеседование frontend Junior+ разработчика (CSS, HTML, JS, React, Typescript, Redux)
                        </span>
                    </a>

                    <a
                        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-24 rounded px-6 flex items-center justify-center text-center"
                        href="https://youtu.be/6-UOa1wXHIg?si=Th7t0RIlIWOKfcgm"
                        target="_blank"
                    >
                        <span class="text-xs font-semibold">
                            Собеседование frontend Junior разработчика (CSS, HTML, JS, React, Typescript)
                        </span>
                    </a>

                    <a
                        class="bg-gradient-to-r from-green-400 via-purple-500 to-blue-500 to-90% h-24 rounded px-6 flex items-center justify-center text-center"
                        href="https://youtu.be/cRqBsepPgoI?si=_YQfktCxCfFxLozv"
                        target="_blank"
                    >
                        <span class="text-xs font-semibold">
                            Собеседование frontend Junior+ разработчика (CSS, HTML, JS, React, Typescript, Redux)
                        </span>
                    </a>
                </div>
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
