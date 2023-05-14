<script lang="ts" setup>
import { watch, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useStore } from '@/store';
import { AnswerLetters } from '@/types';


const store = useStore();
const route = useRoute();
const router = useRouter();


onMounted(() => {
    store.commit('setQuestionNumber', route.params.id);
});
watch(route, ({ params }) => {
    store.commit('setQuestionNumber', params.id);
});


const handleChange = (name: AnswerLetters) => {
    const question = store.getters.currentQuestion;
    if (!question) return;

    const isSelectedAnswer = question.selectedAnswers[name];

    if (question.multipleCorrectAnswers) {
        question.selectedAnswers[name] = !isSelectedAnswer;
    } else {
        Object.keys(question.selectedAnswers).forEach((key) => {
            question.selectedAnswers[key as AnswerLetters] = (key === name);
        });
    }
};

const listener = ({ key }: KeyboardEvent) => {
    const keysMap: Record<number, AnswerLetters|undefined> = {
        1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'd', 6: 'e', 7: 'f',
    };
    const numberKey = parseInt(key, 10);
    if (!Number.isNaN(numberKey)) {
        const question = store.getters.currentQuestion;
        if (!question) return;
        const questionLetter = keysMap[numberKey];
        if (questionLetter) handleChange(questionLetter);
    }
    if (key === 'ArrowRight' || key === 'Enter') {
        if (store.getters.hasNextQuestion && store.getters.hasSelectedAnswer) {
            router.push({ name: 'Question', params: { id: store.state.questionNumber + 1 } });
        } else if (!store.getters.hasNextQuestion && store.getters.hasSelectedAnswer) {
            router.push({ name: 'Result' });
        }
    }
    if (key === 'ArrowLeft' || key === 'Backspace') {
        if (store.getters.hasPrevQuestion) {
            router.push({ name: 'Question', params: { id: store.state.questionNumber - 1 } });
        } else {
            router.push({ name: 'Home' });
        }
    }
};
onMounted(() => {
    window.addEventListener('keydown', listener);
});

onUnmounted(() => {
    window.removeEventListener('keydown', listener);
});

</script>

<template>
    <div
        v-if="store.getters.currentQuestion"
        class="container"
    >
        <h1 class="text-center text-7xl mt-5">
            Question &#8470;{{ $route.params.id }}
        </h1>
        <h2 class="text-center text-4xl">
            in the {{ store.getters.currentQuestion.category }} category
        </h2>
        <div>
            <p class="text-2xl my-6">
                {{ store.getters.currentQuestion.question }}
            </p>
            <div class="flex flex-col text-md">
                <div
                    v-for="[name, answer], index in store.getters.filtredAnswers"
                    :key="answer"
                    class="mb-4"
                >
                    <div
                        class="flex items-center justify-center"
                        :class="{checked: store.getters.currentQuestion.selectedAnswers[name]}"
                    >
                        <span class="w-8 h-8 rounded-full flex items-center justify-center">
                            {{ index + 1 }}
                        </span>
                        <button
                            class="flex border-b w-full text-start p-2 pl-8 items-center"
                            :name="name"
                            @click="handleChange(name)"
                        >
                            {{ answer }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-group grid-cols-2">
            <div>
                <router-link
                    v-if="store.getters.hasPrevQuestion"
                    :to="{name: 'Question', params: { id: Number($route.params.id) - 1 }}"
                    class="button"
                >
                    Previous
                </router-link>
                <router-link
                    v-else
                    :to="{ name: 'Home' }"
                    class="button"
                >
                    Home
                </router-link>
            </div>
            <div>
                <router-link
                    v-if="store.getters.hasNextQuestion && store.getters.hasSelectedAnswer"
                    :to="{name: 'Question', params: { id: Number($route.params.id) + 1 }}"
                    class="button"
                >
                    Next
                </router-link>
                <router-link
                    v-else-if="!store.getters.hasNextQuestion && store.getters.hasSelectedAnswer"
                    :to="{ name: 'Result' }"
                    class="button"
                >
                    Show Results
                </router-link>
            </div>
        </div>
    </div>
    <div
        v-else
        class="flex justify-center flex-col"
    >
        <h1>Question not found</h1>
        <router-link
            class="button"
            :to="{name: 'Home'}"
        >
            Home
        </router-link>
    </div>
</template>

<style scoped>
.checked button {
    @apply text-purple-700 border-b-purple-700
}
.checked span {
    @apply  bg-purple-700 text-white
}
</style>
