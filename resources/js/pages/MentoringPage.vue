<template>
    <SimplePageLayout title="Менторство">
      <template #right>
        <n-button
          type="primary"
          size="tiny"
          @click="setPage('become-mentor')"
        >
          Стать ментором
        </n-button>
<!--        <button-->
<!--          class="text-sm text-gray-300 font-medium p-1 rounded hover:text-gray-400"-->
<!--          type="button"-->
<!--        ></button>-->
      </template>

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

<!--            <div class="flex flex-col gap-1">-->
<!--                <h3 class="uppercase text-xs text-gray-500"></h3>-->
<!--                <ul class="flex flex-col rounded overflow-hidden bg-[#2c2c2c]">-->
<!--                    <li>-->
<!--                        <button-->
<!--                            class="w-full grid grid-cols-[min-content_1fr_min-content] items-center gap-2 p-2 hover:bg-[#282828]"-->
<!--                            type="button"-->
<!--                            @click="setPage('find-mentor')"-->
<!--                        >-->
<!--                            <span class="bg-orange-500 rounded-md flex items-center justify-center w-8 h-8">-->
<!--                                <i class="bi bi-plus-circle-fill text-xl"></i>-->
<!--                            </span>-->
<!--                            <span class="text-xs text-left">Хочу в команду к наставнику</span>-->
<!--                            <i class="bi bi-chevron-right text-xs"></i>-->
<!--                        </button>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <span class="block ml-auto h-px w-[calc(100%-48px)] bg-[#313131]"></span>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <button-->
<!--                            class="w-full grid grid-cols-[min-content_1fr_min-content] items-center gap-2 p-2 hover:bg-[#282828]"-->
<!--                            type="button"-->
<!--                            @click=""-->
<!--                        >-->
<!--                            <span class="bg-green-500 rounded-xl flex items-center justify-center w-8 h-8">-->
<!--                                <i class="bi bi-person-plus-fill text-xl"></i>-->
<!--                            </span>-->
<!--                            <span class="text-xs text-left">Хочу быть наставником</span>-->
<!--                            <i class="bi bi-chevron-right text-xs"></i>-->
<!--                        </button>-->
<!--                    </li>-->
<!--                </ul>-->
<!--            </div>-->

            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">Наш опыт</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <span>
                        Это наш телеграм-канал, который мы давно ведем и где мы сделали много полезных материалов для студентов по программированию на Python, JavaScript, HTML, CSS и других технологий:
                    </span>
                    <a class="text-blue-400" href="https://t.me/WriteOffGroup" target="_blank">https://t.me/WriteOffGroup</a>
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">Наша история</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <img
                        class="w-full rounded"
                        src="../../images/Mentoring.jpg"
                        alt="Летняя менторская программа"
                        loading="lazy"
                    >
                    <span class="border-l-[3px] border-green-400 rounded pl-3 py-1">
                        Решил заняться менторством в сфере IT.
                        <br>
                        <br>
                        В студенческой беседе одной из дисциплин сделал саморекламу. С этой рекламы на 400 человек набралось 5-6 человек (чуть больше чем хотелось, но я только рад 🙃)
                        <br>
                        <br>
                        До этого опыта не было. Сегодня было первых 3 созвона на дню, решил поэкспериментировать)
                        <br>
                        <br>
                        Первые менторские встречи провожу разговорные: знакомство, цели, интересы и тд. За последние 3 месяца меняю 3-й стул — всё не удобно. Спина устаёт. Решил разговорные встречи проводить стоя.
                        <br>
                        <br>
                        Нашёл дома коробку, вместе со столом она идеально подходит под мой рост, поставил на неё микрофон.
                    </span>

                    <span>
                        Пишу я, Денис Загвоздин, в <a class="text-blue-400" href="https://t.me/c/1976905523/6" target="_blank">своем телеграм-канале</a>.
                        Именно с менторской программы началась история этого сайта. Первые менторские сессии начались ещё летом 2023 года.
                    </span>
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">Примеры работ</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <span>
                        На практике мы выявили, что самое эффективное обучение ― обучение, при котором <a class="text-blue-400" target="_blank" href="https://rso.kuz-edu.ru/index.php/kak-stat-menti">менти</a> погружается в максимально приближенную к рабочей обстановку.
                    </span>
                    <span>
                        GitHub-репозиторий, ветка для работы, пулреквесты ― два участника прошли через такую программу и оказались очень довольны результатом и продуктивной работой. А ознакомиться с результатами можно по ссылкам ниже.
                    </span>

                    <div class="grid grid-cols-2 gap-2">
                        <a class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded h-16 flex items-center justify-center" href="https://github.com/Den4ik117/js-education" target="_blank">
                            <span class="font-medium text-xs text-center">
                                Ученик<br><span class="font-bold">Никита Чашкин</span>
                            </span>
                        </a>
                        <a class="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded h-16 flex items-center justify-center" href="https://github.com/Den4ik117/let-us-type-up" target="_blank">
                            <span class="font-medium text-xs text-center">
                                Ученик<br><span class="font-bold">Владислав Киор</span>
                            </span>
                        </a>
                    </div>
                </div>
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
