<template>
    <Header />
    <div v-if="store.getters.hasQuestions">
        <router-view/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Header from '@/components/Header.vue'
import { useStore } from '@/store'


export default defineComponent({
    components: { Header },
    name: 'App',
    setup() {
        const store = useStore()
        store.dispatch('fetchQuestions')
        return { store }
    },
})
</script>
