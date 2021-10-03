<template>
    <div
        v-if="store.getters.currentQuestion"
        class="container"
    >
        <h1 class="title">
            Question N {{ $route.params.id }}
        </h1>
        <div>
            <h2 class="question">
                {{ store.getters.currentQuestion.question }}
            </h2>
            <div class="answers">
                <div
                    v-for="[name, answer] in store.getters.filtredAnswers"
                    :key="answer"
                    class="select"
                >
                    <input
                        v-if="store.getters.currentQuestion"
                        :id="name"
                        type="checkbox"
                        :name="name"
                        @input="handleChange"
                    >
                    <label
                        :for="name"
                        :class="{checked: store.getters.currentQuestion.selectedAnswers[name]}"
                    >
                        {{ answer }}
                    </label>
                </div>
            </div>
        </div>
        <div class="actions">
            <router-link
                v-if="store.getters.hasPrevQuestion"
                :to="{name: 'Question', params: { id: Number($route.params.id) - 1 }}"
                class="button actions__item"
            >
                Previous Question
            </router-link>
            <router-link
                v-else
                :to="{ name: 'Home' }"
                class="button actions__item"
            >
                Go Home
            </router-link>
            <router-link
                v-if="store.getters.hasNextQuestion && store.getters.hasSelectedAnswer"
                :to="{name: 'Question', params: { id: Number($route.params.id) + 1 }}"
                class="button actions__item"
            >
                Next Question
            </router-link>
            <router-link
                v-else-if="!store.getters.hasNextQuestion && store.getters.hasSelectedAnswer"
                :to="{ name: 'Result' }"
                class="button actions__item"
            >
                Show Results
            </router-link>
        </div>
    </div>
    <div
        v-else
        class="no-question"
    >
        <h1>Question not found</h1>
        <router-link
            class="button"
            :to="{name: 'Home'}"
        >
            Go Home
        </router-link>
    </div>
</template>


<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useStore } from '../store';
import { AnswerLetters } from '../types';


export default defineComponent({
    setup() {
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

        return { store, handleChange };
    },
});
</script>

<style lang="scss" scoped>
    .question {
        margin-bottom: var(--sp-2);
    }
    .answers {
        display: grid;
        grid-template-columns: repeat(var(--cols), 1fr);
    }
    .actions {
        display: flex;
        justify-content: space-around;
        margin-top: var(--sp-5);

        &__item {
            margin: 0 var(--sp-2);
        }
    }
    .no-question {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
