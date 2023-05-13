<template>
    <Header />
    <router-view />
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue';

import { QUESTIONS_STORAGE_NAME } from './constants';
import { useStore } from './store';

import Header from '@/components/Header.vue';


const store = useStore();

store.dispatch('initQuestions', null);
watchEffect(() => {
    localStorage.setItem(QUESTIONS_STORAGE_NAME, JSON.stringify(store.state.questions));
});

</script>
