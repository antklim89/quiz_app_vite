<template>
    <div class="container">
        <h1 class="title">Result</h1>
        <div>
            <div v-for="result in store.getters.results" :key="result.id">
                <h5>{{ result.question }}</h5>
                <p>Answer is {{ result.isCorrect ? '' : 'not'}} correct.</p>
                <p>{{ result.explanation }}</p>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

import { useStore } from '@/store'


export default defineComponent({
    setup() {
        const store = useStore()


        return { store }
    },
})
</script>
