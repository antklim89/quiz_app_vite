<template>
    <div class="container" v-if="store.getters.currentQuestion">
        <h1>Question N {{ $route.params.id }}</h1>
        <div>
            <h2 class="question">{{ store.getters.currentQuestion.question }}</h2>
            <div class="answer__list">
                <div
                    v-for="[name, answer] in store.getters.filtredAnswers"
                    :key="answer"
                    class="answer"
                    :for="answer"
                >
                    <input
                        v-if="store.getters.currentQuestion"
                        class="answer__input"
                        type="checkbox"
                        :name="name"
                        :id="name"
                        @input="handleChange"
                        :class="{checked: store.getters.currentQuestion.selected_answers[name]}"
                    >
                    <label class="answer__label" :for="name">{{ answer }}</label>
                </div>
            </div>
        </div>
        <div class="actions">
            <router-link
                :to="{name: 'Question', params: { id: Number($route.params.id) - 1 }}"
                class="button"
                v-if="store.getters.hasPrevQuestion"
            >
                Previous Question
            </router-link>
            <div class="grow"></div>
            <router-link
                :to="{name: 'Question', params: { id: Number($route.params.id) + 1 }}"
                class="button"
                v-if="store.getters.hasNextQuestion"
            >
                Next Question
            </router-link>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useStore } from '@/store'
import { AnswersVariants, SelectedAnswersVariants } from '@/types'


export default defineComponent({
    setup() {
        const store = useStore()
        const route = useRoute()

        store.commit('setQuestionNumber', route.params.id)
        watch(route, ({ params }) => {
            store.commit('setQuestionNumber', params.id)
        })


        const handleChange = (e: { target: { checked: boolean, name: string } }) => {
            const question = store.getters.currentQuestion

            if (!question) return
            const selectedAnswerName = e.target.name as AnswersVariants
            const { checked } = e.target

            if (question.multiple_correct_answers) {
                question.selected_answers[selectedAnswerName] = checked
            } else {
                Object.keys(question.selected_answers).forEach((key) => {
                    const answerKey = key as SelectedAnswersVariants
                    if (answerKey === selectedAnswerName) {
                        question.selected_answers[answerKey] = true
                    } else {
                        question.selected_answers[answerKey] = false
                    }
                })
            }
        }

        return { store, handleChange }
    },
})
</script>

<style lang="scss" scoped>
    h1 {
        text-align: center;
        margin: var(--space-5) 0;
    }
    .question {
        margin-bottom: var(--space-2);
    }
    .answer {
        flex: 1 1 calc(50% - var(--space-2) * 2);
        margin: var(--space-2);
        border: 1px solid var(--secondary-color);

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
            outline: 5px solid var(--secondary-color);
            outline-offset: -5px;
        }
    }
    .actions {
        display: flex;

        .grow {
            flex-grow: 1;
        }

        .button {
            background: var(--secondary-color);
            border: none;
            padding: var(--space-3) var(--space-5);
            margin: var(--space-3) auto;
            color: var(--light-color);
        }
    }
</style>
