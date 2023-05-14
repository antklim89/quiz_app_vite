<script lang="ts" setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';

import { useStore } from '@/store';
import { AnswerLetters } from '@/types';


const store = useStore();
const route = useRoute();

store.commit('setQuestionNumber', route.params.id);
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
                    <button
                        class="flex border-b w-full text-start p-2 pl-28 items-center"
                        :name="name"
                        :class="{checked: store.getters.currentQuestion.selectedAnswers[name]}"
                        @click="handleChange(name)"
                    >
                        <span class="flex mr-8 w-[32px] h-[32px] rounded-full items-center justify-center">
                            {{ index + 1 }}
                        </span>
                        {{ answer }}
                    </button>
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
.checked {
    @apply text-purple-700 border-b-purple-700
}
.checked span {
    @apply  bg-purple-700 text-white
}
</style>
