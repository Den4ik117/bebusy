<template>
    <section>
        <slot v-if="status === LoadingStatuses.Loading" name="loading">
            <div class="flex justify-center">
                <AppLoader />
            </div>
        </slot>
        <slot v-else-if="status === LoadingStatuses.Ready"/>
        <slot v-else-if="status === LoadingStatuses.Empty" name="empty">
            <p class="text-center text-gray-800 font-medium">Ничего не найдено <i class="bi bi-emoji-frown"></i></p>
        </slot>
        <slot v-else-if="status === LoadingStatuses.Error" name="error">
            <p class="text-center text-red-500 font-medium">Произошла ошибка при загрузке данных <i class="bi bi-emoji-frown"></i></p>
        </slot>
    </section>
</template>

<script>
import AppLoader from './AppLoader.vue';
import { LoadingStatuses } from './config';
import { validateStatus } from './lib';

export default {
    components: {
        AppLoader,
    },
    props: {
        status: {
            type: String,
            required: true,
            validator: validateStatus,
        },
    },
    setup() {
        return {
            LoadingStatuses,
        };
    }
}
</script>
