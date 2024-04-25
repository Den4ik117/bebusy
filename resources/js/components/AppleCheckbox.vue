<template>
    <button
        class="h-7 w-12 rounded-full relative cursor-pointer transition-all"
        :class="classes[0]"
        type="button"
        @click="checked = !checked"
    >
        <span
            class="bg-white w-6 h-6 rounded-full absolute transition-all top-0.5"
            :class="classes[1]"
        ></span>
    </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    value: {
        type: Boolean,
        required: true,
    },
})

const emit = defineEmits(['update:value'])

const checked = computed({
    get: () => props.value,
    set: value => emit('update:value', value),
})

const classes = computed(() => {
    if (!checked.value) return [{
        'bg-[#2c2c2c]': true,
    }, {
        'left-0.5': true,
    }]

    return [{
        'bg-green-500': true,
    }, {
        'left-[22px]': true,
    }]
})
</script>
