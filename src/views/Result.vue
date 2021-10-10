<template>
    <section
        v-if="store.getters.allQuestionsAnswered"
        class="container"
    >
        <h1 class="title">
            Results
        </h1>
        <p
            v-if="store.getters.allQuestionsAnsweredCorrect"
            class="conclusion"
        >
            You answered all {{ store.state.questions.length }} questions correctly.
        </p>
        <p
            v-else
            class="conclusion"
        >
            You answered {{ store.getters.numberWrongAnsweres }} questions incorrectly.
        </p>
        <div class="results">
            <div
                v-for="result, index in store.getters.results"
                :key="result.id"
                class="result"
            >
                <h2 class="result__title">
                    {{ index + 1 }}.
                    {{ result.question }}
                </h2>
                <div>
                    <b>Difficulty: {{ result.difficulty }}. </b>
                    <b>Category: {{ result.category }}. </b>
                </div>
                <p
                    class="result__answer"
                    :class="{correct: result.isCorrect}"
                >
                    <span>
                        Your
                        {{ result.selectedAnswer.length === 1 ? 'answer' : 'answers' }}
                        {{ result.selectedAnswer.map((i) => `"${i}"`).join(', ') }}
                        {{ result.selectedAnswer.length === 1 ? 'is' : 'are' }}
                        {{ result.isCorrect ? '' : 'not' }}
                        correct.
                    </span>
                    <span v-if="!result.isCorrect">
                        Correct
                        {{ result.correctAnswers.length === 1 ? 'answer is' : 'answers are' }}
                        {{ result.correctAnswers.map((i) => `"${i}"`).join(', ') }}
                        .
                    </span>
                </p>
                <p class="result__explanation">
                    {{ result.explanation }}
                </p>
            </div>
        </div>
        <div class="footer">
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
        <div class="conclusion">
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


<script lang="ts" setup>
import { useStore } from '../store';


const store = useStore();

</script>

<style lang="scss" scoped>
.conclusion {
    font-size: var(--fs-lg);
    color: var(--primary-color);
    margin-bottom: var(--sp-5);
    text-align: center;
}

.results {
    display: flex;
    flex-direction: column;
}

.result {
    padding: var(--sp-2);
    margin-bottom: var(--sp-1);

    &__title {
        color: var(--primary-color);
    }

    &__answer {
        margin: var(--sp-2) 0;
        font-size: var(--fs-lg);
        color: var(--incorrect-color);

        &.correct {
            color: var(--correct-color);
        }
    }
}

.footer {
    display: flex;
    justify-content: center;
    margin: var(--sp-4) 0;
}
</style>
