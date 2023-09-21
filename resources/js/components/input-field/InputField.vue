<template>
    <div class="input-field">
        <input :id="id" class="input-field__input" :type="type" placeholder="" v-model="value">
        <label :for="id" class="input-field__label">{{ text }}</label>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
        default: 'text',
    },
    text: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        required: true,
    }
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
})
</script>

<style lang="scss">
.input-field {
    @apply relative;

    .input-field__input {
        @apply rounded-xl border px-4 border-gray-700 w-full h-12 bg-transparent text-sm;

        &:hover,
        &:focus {
            @apply border-indigo-400;
        }

        //&:focus {
        //    @apply border-2;
        //}

        &:hover ~ .input-field__label,
        &:focus ~ .input-field__label {
            @apply text-indigo-400;
        }

        &:focus ~ .input-field__label,
        &:not(:placeholder-shown) ~ .input-field__label {
            top: 2px;
            @apply text-xs font-medium;
        }
    }

    .input-field__label {
        @apply bg-slate-900 text-gray-500 text-sm px-1;
        //padding: 0 0.25rem;
        cursor: text;
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        transition: 0.2s top, 0.2s font-size;
    }
}
</style>
