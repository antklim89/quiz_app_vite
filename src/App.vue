<template>
    <Header />
    <router-view />
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';

import { QUESTIONS_STORAGE_NAME } from './constants';

import Header from '@/components/Header.vue';
import { useStore } from '@/store';


export default defineComponent({
    name: 'App',
    components: { Header },
    setup() {
        const store = useStore();

        store.dispatch('initQuestions');
        watchEffect(() => {
            localStorage.setItem(QUESTIONS_STORAGE_NAME, JSON.stringify(store.state.questions));
        });
    },
});
</script>
