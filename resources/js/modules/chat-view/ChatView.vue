<template>
    <div class="relative">
        <img
            class="absolute top-0 left-0 right-0 bottom-0 object-cover"
            src="../../../images/Background-1.jpg"
            alt="Задний фон чата"
            loading="lazy"
        >
        <div class="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25"></div>
        <div class="absolute top-0 left-0 right-0 bottom-0 grid grid-rows-[1fr_min-content]">
            <div ref="messageBox" class="flex flex-col gap-2 max-h-full p-2 overflow-x-hidden overflow-y-auto">
                <template v-if="activeChat && activeChat.messages">
                    <MessageItem
                        v-for="(message, index) in activeChat.messages"
                        :key="message.id"
                        :message="message"
                        :avatar="showAvatar(index)"
                    />
                </template>
            </div>

            <form class="grid grid-cols-[1fr_min-content] items-center gap-2 p-2" @submit.prevent="onSubmitForm">
                <textarea
                    class="bg-[#212121] py-2 px-4 rounded-md text-sm resize-none"
                    :rows="form.message.split('\n').length"
                    placeholder="Сообщение"
                    v-model="form.message"
                    @keydown="onTextareaKeydown"
                ></textarea>
                <button
                    class="bg-indigo-400 rounded-full flex items-center h-10 w-10 justify-center disabled:opacity-80"
                    type="submit"
                    :disabled="form.message.length === 0"
                >
                    <i class="bi bi-send-fill"></i>
                </button>
                <div
                    v-show="actions.length > 0"
                    class="col-span-full flex flex-col gap-2"
                >
                    <div
                        v-for="action in actions"
                        :key="action"
                        class="flex gap-2"
                    >
                        <button
                            v-for="text in action"
                            :key="text.text"
                            class="w-full rounded bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-2 py-1 text-xs"
                            type="button"
                            @click="() => onActionClick(text.text)"
                        >{{ text.text }}</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed, onMounted, watch, ref } from 'vue';
import { useStore } from 'vuex';
import MessageItem from '@/components/message-item';

const store = useStore();

let socket;

const form = reactive({
    message: computed({
        get: () => store.state.message,
        set: (value) => store.commit({
            type: 'setMessage',
            value: value,
        }),
    }),
});

const messageBox = ref(null);

const activeChat = computed(() => store.getters.activeChat);

const lastMessage = computed(() => activeChat.value?.messages?.at(-1))

const actions = computed(() => lastMessage.value?.actions || [])

const showAvatar = (index) => {
    const currentMessage = activeChat.value?.messages?.[index];
    const nextMessage = activeChat.value?.messages?.[index + 1];

    return nextMessage?.user_id !== currentMessage?.user_id;
};

const scrollToBottom = async () => {
    // messageBox.value?.scrollTo(0, messageBox.value?.scrollHeight)

    setTimeout(() => messageBox.value?.scrollTo(0, messageBox.value?.scrollHeight), 250);
};

watch(() => activeChat.value?.messages.length, () => {
    // console.log('test')
    // console.log('chandd')
    scrollToBottom();
});

const onSubmitForm = () => {

    store.dispatch('sendMessage');

    // return;
    //
    // const message = {
    //     id: Date.now(),
    //     event: 'message',
    //     text: form.message,
    //     chat_id: store.getters.activeChat.id,
    //     user_id: store.state.me.id,
    // };
    //
    // socket.send(JSON.stringify(message));

    // request(`/api/chats/${store.state.hash}/messages`, 'POST', form, undefined, (data) => {
    //     form.message = '';
    //
    //     store.commit({
    //         type: 'pushMessages',
    //         messages: [data.data],
    //         callback: scrollToBottom,
    //     });
    // }, () => {
    //     console.log('error');
    // });
};

const onActionClick = (text) => {
    form.message = text

    onSubmitForm()
}

const onTextareaKeydown = (event) => {
    if (!(event instanceof KeyboardEvent)) return;

    if (event.key === 'Enter') {
        event.preventDefault();

        if (event.shiftKey || event.ctrlKey) {
            form.message += '\n';
            return;
        }

        onSubmitForm();
    }
};

onMounted(() => {
    scrollToBottom();
});
</script>
