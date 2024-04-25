<template>
    <SimplePageLayout title="О программе">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
                <h3 class="uppercase text-xs text-gray-500">О нас</h3>
                <div class="rounded bg-[#2c2c2c] text-sm p-2 flex flex-col gap-4">
                    <span>
                        Мы команда энтузиастов, состоящая из:
                    </span>
                    <ol class="list-decimal list-inside">
                        <li>Федоров Семен;</li>
                        <li>Язовских Елена;</li>
                        <li>Загвоздин Денис.</li>
                    </ol>
                    <span>
                        Разрабатываем социальную сеть для соискателей. Помогаем найти вам первую работу!
                    </span>
                </div>
            </div>
        </div>
    </SimplePageLayout>
</template>

<script setup>
import SimplePageLayout from "@/components/SimplePageLayout.vue";
</script>
