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
            <div class="answer__list">
                <div
                    v-for="[name, answer] in store.getters.filtredAnswers"
                    :key="answer"
                    class="answer"
                    :for="answer"
                >
                    <input
                        v-if="store.getters.currentQuestion"
                        :id="name"
                        class="answer__input"
                        type="checkbox"
                        :name="name"
                        :class="{checked: store.getters.currentQuestion.selectedAnswers[name]}"
                        @input="handleChange"
                    >
                    <label
                        class="answer__label"
                        :for="name"
                    >{{ answer }}</label>
                </div>
            </div>
        </div>
        <div class="actions">
            <router-link
                v-if="store.getters.hasPrevQuestion"
                :to="{name: 'Question', params: { id: Number($route.params.id) - 1 }}"
                class="button"
            >
                Previous Question
            </router-link>
            <router-link
                v-else
                :to="{ name: 'Home' }"
                class="button"
            >
                Go Home
            </router-link>
            <div class="grow" />
            <router-link
                v-if="store.getters.hasNextQuestion && store.getters.hasSelectedAnswer"
                :to="{name: 'Question', params: { id: Number($route.params.id) + 1 }}"
                class="button"
            >
                Next Question
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


        const handleChange = (e: { target: { checked: boolean, name: string } }) => {
            const question = store.getters.currentQuestion;

            if (!question) return;
            const selectedAnswerName = e.target.name as AnswerLetters;
            const { checked } = e.target;

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
        margin-bottom: var(--space-2);
    }
    .answer {
        flex: 1 1 calc(50% - var(--space-2) * 2);
        margin: var(--space-2);
        border: 1px solid var(--primary-color);

        &__list {
            display: flex;
            margin: calc(var(--space-2) * -1);
        }

        &__input {
            display: none;
        }

        &__label {
            display: inline-block;
            font-size: 1.2rem;
            width: 100%;
            padding: var(--space-2) 0;
            text-align: center;
            cursor: pointer;
            transition: 100ms;
        }

        &__input.checked + &__label  {
            outline: 5px solid var(--primary-color);
            outline-offset: -5px;
        }
    }
    .actions {
        display: flex;

        .grow {
            flex-grow: 1;
        }
    }
    .no-question {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
