<template>
    <Header />
    <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Header from '@/components/Header.vue'
import Home from './views/Home.vue'


export default defineComponent({
    components: { Header, Home },
    name: 'App',
})
</script>
