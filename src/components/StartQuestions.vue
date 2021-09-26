<template>
    <div class="container">
        <div>
            <label for="difficulty">Select difficulty: </label>
            <select v-model="difficulty">
                <option value="Easy">
                    Easy
                </option>
                <option value="Medium">
                    Medium
                </option>
                <option value="Hard">
                    Hard
                </option>
            </select>
        </div>
        <div>
            <label for="category">Select category: </label>
            <select v-model="category">
                <option value="all">
                    all
                </option>
                <option value="linux">
                    linux
                </option>
                <option value="javascript">
                    javascript
                </option>
                <option value="php">
                    php
                </option>
            </select>
        </div>
        <button
            class="start"
            @click="startQuiz"
        >
            Start Quiz
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useStore } from '@/store';


export default defineComponent({
    setup() {
        const difficulty = ref('Easy');
        const category = ref('all');

        const store = useStore();
        const { push } = useRouter();

        const startQuiz = async () => {
            console.debug('start: \n');
            await store.dispatch('fetchQuestions');
            push({ name: 'Question', params: { id: 1 } });
        };

        return { difficulty, category, startQuiz };
    },
});
</script>

<style lang="scss" scoped>
.start {
    font-size: 50px;
    border: none;
    border-radius: 0.5rem;
    background: var(--primary-color);
    color: var(--light-color);
    padding: var(--space-2);
    cursor: pointer;
    margin: 5rem 0;
    text-decoration: none;
}
</style>
