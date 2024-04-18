<template>
    <div class="w-[90px] float-right">
        <img class="w-full h-auto" :src="data.photo.medium" alt="Аватар резюме">
    </div>
    <p class="text-base font-medium">{{ `${data.last_name} ${data.first_name} ${data.middle_name}` }}</p>
    <p class="text-xs mt-4">{{ data.gender.name }}, {{ getAge(data.birth_date) }}, родился {{ getHumanDate(data.birth_date) }}</p>
    <p class="text-gray-500 text-xs mt-4 uppercase"><small>Контакты</small></p>
    <p class="text-xs flex flex-col mt-2">
        <template v-for="contact in data.contact">
            <template v-if="contact.type.id === 'cell'">
                <span><i class="bi bi-check2 text-green-400"></i> {{ contact.value.formatted }}{{ contact.preferred ? ' — предпочитаемый способ связи' : '' }}</span>
                <span v-if="contact.verified" class="text-gray-500 uppercase"><small>Телефон подтверждён</small></span>
            </template>

            <template v-if="contact.type.id === 'email'">
                <span><a class="text-indigo-500 hover:text-indigo-600" :href="`mailto:${contact.value}`">{{ contact.value }}</a>{{ contact.preferred ? ' — предпочитаемый способ связи' : '' }}</span>
            </template>
        </template>

        <template v-for="site in data.site">
            <span><a class="text-indigo-500 hover:text-indigo-600" :href="site.url" target="_blank">{{ site.url }}</a></span>
        </template>
    </p>
    <p class="text-xs mt-4">{{ data.area.name }}, м. {{ data.metro?.name }}, {{ data.relocation?.type?.name }}, {{ data.business_trip_readiness?.name }}</p>
    <p class="text-sm font-medium mt-6">{{ data.title }}</p>
    <p class="text-sm mt-4">{{ data.salary.amount }} ₽ на руки</p>
    <p class="text-xs mt-4">Специализации:</p>
    <ul class="flex flex-col text-xs mt-1 list-disc list-inside">
        <li
            v-for="role in data.professional_roles"
        >{{ role.name }}</li>
    </ul>
    <p class="text-xs mt-4">Занятость: {{ data.employment.name }}</p>
    <p class="text-xs mt-1">График работы: {{ data.schedules.map(schedule => schedule.name.toLowerCase()).join(', ') }}</p>
    <p class="text-sm text-gray-500 mt-6">Опыт работы {{ getHumanExperience(data.total_experience.months) }}</p>
    <template v-for="experience in data.experience">
        <p class="text-xs mt-4">{{ experience.start }} — {{ experience.end || 'по настоящее время' }}</p>
<!--        <p class="text-xs text-gray-500 mt-1">{{ data.total_experience.months }}</p>-->
        <p class="text-xs font-semibold mt-1">{{ experience.company }}</p>
        <p class="text-xs mt-1">{{ experience.area.name }}, {{ experience.company_url }}</p>
        <p class="text-xs font-semibold mt-4">{{ experience.position }}</p>
        <p class="text-xs mt-1" v-html="experience.description.replaceAll('\n', '<br>')"></p>
    </template>
    <p class="text-sm text-gray-500 mt-6">Ключевые навыки</p>
    <ul class="text-xs flex flex-wrap gap-2 mt-4">
        <li
            v-for="skill in data.skill_set"
            :key="skill"
            class="bg-gray-800 px-2 py-1 rounded-full"
        >{{ skill }}</li>
    </ul>
    <p class="text-sm text-gray-500 mt-6">Опыт вождения</p>
    <template v-for="license in data.driver_license_types">
        <p class="text-xs mt-4">Права категории {{ license.id }}</p>
    </template>
    <p class="text-sm text-gray-500 mt-6">Обо мне</p>
    <p class="text-xs mt-4" v-html="data.skills.replaceAll('\n', '<br>')"></p>
    <p class="text-sm text-gray-500 mt-6">{{ data.education.level.name || 'Какое-то' }} образование</p>
    <template v-for="primary in data.education.primary">
        <p class="text-xs mt-4 flex flex-col">
            <span>{{ primary.year }}</span>
            <span class="font-bold">{{ primary.name }}</span>
            <span>{{ primary.organization }}, {{ primary.result }}</span>
        </p>
    </template>
    <p class="text-sm text-gray-500 mt-6">Знания языков</p>
    <ul class="text-xs mt-4 flex flex-col gap-2">
        <li
            v-for="language in data.language"
            class="bg-gray-800 px-2 py-1 rounded-full self-start"
        >{{ language.name }} — {{ language.level.name }}</li>
    </ul>
    <p class="text-sm text-gray-500 mt-6">Гражданство, время в пути до работы</p>
    <p class="text-xs mt-4 flex flex-col">
        <span>Гражданство: {{ data.citizenship.map(c => c.name).join(', ') }}</span>
        <span>Разрешение на работу: {{ data.work_ticket.map(w => w.name).join(', ') }}</span>
        <span>Желательное время в пути до работы: {{ data.travel_time.name }}</span>
    </p>
</template>

<script setup>
import { getAge, getHumanDate, getHumanExperience } from '@/utils'

const props = defineProps({
    resume: {
        type: Object,
        required: true,
    },
})

const data = props.resume.data
</script>
