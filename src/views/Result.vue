<script lang="ts" setup>
import { useStore } from '../store';


const store = useStore();
const category = store.getters.currentQuestion?.category;
</script>

<template>
    <section
        v-if="store.getters.allQuestionsAnswered"
        class="container"
    >
        <h1 class="title">
            Results in category {{ category }}.
        </h1>
        <p
            v-if="store.getters.allQuestionsAnsweredCorrect"
            class="text-2xl text-center mb-4 text-green-600"
        >
            You answered all
            <span class="font-bold text-3xl">{{ store.state.questions.length }}</span>
            questions correctly.
        </p>
        <p
            v-else
            class="text-2xl text-center mb-4 text-red-600"
        >
            You answered
            <span class="font-bold text-3xl">{{ store.getters.numberWrongAnsweres }}</span>
            questions incorrectly.
        </p>
        <div class="flex flex-col space-y-4">
            <router-link
                v-for="result, index in store.getters.results"
                :key="result.id"
                :to="{name: 'Question', params: { id: index + 1 }}"
                class=" p-4 bg-opacity-25"
                :class="{'bg-green-200': result.isCorrect, 'bg-red-200': !result.isCorrect}"
            >
                <h2 class="text-2xl mb-2">
                    {{ index + 1 }}. {{ result.question }}
                </h2>
                <p class="mb-2 text-lg">
                    Your
                    {{ result.selectedAnswer.length === 1 ? 'answer' : 'answers' }}
                    {{ result.selectedAnswer.map((i) => `"${i}"`).join(', ') }}
                    {{ result.selectedAnswer.length === 1 ? 'is' : 'are' }}
                    {{ result.isCorrect ? '' : 'not' }}
                    correct.
                </p>
                <p
                    v-if="!result.isCorrect"
                    class="mb-2 text-lg"
                >
                    Correct
                    {{ result.correctAnswers.length === 1 ? 'answer is' : 'answers are' }}
                    {{ result.correctAnswers.map((i) => `"${i}"`).join(', ') }}
                    .
                </p>
                <p class="mb-2 text-lg">
                    {{ result.explanation }}
                </p>
            </router-link>
        </div>
        <div class="flex justify-center my-8">
            <router-link
                class="button"
                :to="{name: 'Home'}"
            >
                Go Home
            </router-link>
        </div>
    </section>
    <section
        v-else
        class="container"
    >
        <h1 class="title">
            Results
        </h1>
        <div>
            Not all questions answered.
        </div>
        <router-link
            class="button"
            :to="{name: 'Question', params: {id: 1}}"
        >
            Go Back
        </router-link>
    </section>
</template>

<style lang="scss" scoped>
</style>
