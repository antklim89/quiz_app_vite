<script lang="ts" setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';

import { useStore } from '../store';
import { AnswerLetters } from '../types';


const store = useStore();
const route = useRoute();

store.commit('setQuestionNumber', route.params.id);
watch(route, ({ params }) => {
    store.commit('setQuestionNumber', params.id);
});


const handleChange = (e: Event) => {
    const question = store.getters.currentQuestion;

    if (!question) return;
    const target = e.target as HTMLInputElement;
    const selectedAnswerName = target.name as AnswerLetters;
    const { checked } = target;

    if (question.multipleCorrectAnswers) {
        question.selectedAnswers[selectedAnswerName] = checked;
    } else {
        Object.keys(question.selectedAnswers).forEach((key) => {

            const answerKey = key as AnswerLetters;
            if (answerKey === selectedAnswerName) {
                question.selectedAnswers[answerKey] = true;
            } else {
                question.selectedAnswers[answerKey] = false;
            }
        });
    }
};
</script>

<template>
    <div
        v-if="store.getters.currentQuestion"
        class="container"
    >
        <h1 class="text-center text-5xl mt-5">
            Question &#8470;{{ $route.params.id }}
        </h1>
        <h2 class="text-center text-2xl">
            in the {{ store.getters.currentQuestion.category }} category
        </h2>
        <div>
            <p class="text-xl my-6">
                {{ store.getters.currentQuestion.question }}
            </p>
            <div class="flex flex-col text-md">
                <div
                    v-for="[name, answer] in store.getters.filtredAnswers"
                    :key="answer"
                    class=""
                >
                    <input
                        v-if="store.getters.currentQuestion"
                        :id="name"
                        type="checkbox"
                        :name="name"
                        class="w-0 h-0 outline-none"
                        @input="handleChange"
                    >
                    <label
                        class="flex border-b px-2 cursor-pointer ml-2"
                        :for="name"
                        :class="{checked: store.getters.currentQuestion.selectedAnswers[name]}"
                    >
                        {{ answer }}
                    </label>
                </div>
            </div>
        </div>
        <div class="button-group sm:grid-cols-2">
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

<style>
.checked {
    @apply text-primary-600 border-primary-600
}
</style>
