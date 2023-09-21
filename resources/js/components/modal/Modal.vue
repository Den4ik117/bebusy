<template>
    <div v-show="visible" class="modal absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 z-50 max-h-[100dvh] overflow-y-auto" @click="onClick">
        <div class="my-8 mx-4 rounded-md bg-slate-900 ">
            <div class="p-4 overflow-y-auto">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        required: false,
        default: true,
    },
})

const emit = defineEmits(['update:visible'])

const visible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value),
})

const closeOnEscape = (event) => {
    if (event.key === 'Escape') {
        visible.value = false
    }
}

const onChangeVisible = (value) => {
    if (value) {
        document.addEventListener('keydown', closeOnEscape)
    } else {
        document.removeEventListener('keydown', closeOnEscape)
    }
}

const onClick = (event) => {
    if (event.target.classList.contains('modal')) {
        visible.value = false
    }
}

watch(() => props.visible, onChangeVisible)

onChangeVisible(props.visible)
</script>
