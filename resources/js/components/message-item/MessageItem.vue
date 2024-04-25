<template>
    <template v-if="!message.user">
        <div class="flex justify-center">
            <span class="bg-[#212121] px-3 py-1 rounded-full text-sm">{{ message.content }}</span>
        </div>
    </template>
    <template v-else>
        <div
            class="flex gap-2 items-end shadow-md"
            :class="{ 'flex-row': !isMe, 'flex-row-reverse': isMe }"
        >
<!--            <div-->
<!--                class="w-8 h-8 flex-none rounded-full bg-amber-500"-->
<!--                :class="{ invisible: !avatar }"-->
<!--            ></div>-->
            <div
                class="rounded-md p-2 text-sm whitespace-pre-wrap relative"
                :class="{ 'bg-[#212121] rounded-bl-none ml-[9px]': !isMe, 'bg-indigo-600 rounded-br-none mr-[9px]': isMe }"
            >
                <ResumeMessage v-if="message.resume" :resume="message.resume"/>
                <span v-else>{{ message.content }}</span>

                <svg v-if="isMe" width="9" height="20" class="absolute -right-[9px] -bottom-[3px] fill-indigo-600">
                    <defs>
                        <filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox"
                                id="messageAppendix">
                            <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                            <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1"
                                            result="shadowBlurOuter1"></feGaussianBlur>
                            <feColorMatrix
                                values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0"
                                in="shadowBlurOuter1"></feColorMatrix>
                        </filter>
                    </defs>
                    <g fill-rule="evenodd">
                        <path
                            d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z"
                            fill="inherit" filter="url(#messageAppendix)"></path>
                        <path
                            d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z"
                            fill="inherit" class="corner"></path>
                    </g>
                </svg>

                <svg v-else width="9" height="20" class="absolute -left-[9px] -bottom-[3px] fill-[#212121]"><defs><filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox" id="messageAppendix"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g fill-rule="evenodd"><path d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z" fill="inherit" filter="url(#messageAppendix)"></path><path d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z" fill="inherit" class="corner"></path></g></svg>
<!--                <span class="block absolute w-4 h-4 bg-red-400 rounded-b-full"></span>-->
            </div>
        </div>
    </template>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ResumeMessage from '@/components/resume-message'

const store = useStore();

const props = defineProps({
    message: {
        type: Object,
        required: true,
    },
    avatar: {
        type: Boolean,
        required: false,
        default: true,
    },
});

const isMe = computed(() => store.state.me?.id === props.message.user_id);
</script>
