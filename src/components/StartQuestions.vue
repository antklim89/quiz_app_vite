<template>
    <div class="container">
        <div class="categories">
            <div
                v-for="category in categories"
                :key="category"
                class="category select"
            >
                <label
                    :for="category"
                    :class="{checked: store.state.selectedCategory === category}"
                >
                    {{ category }}
                </label>
                <input
                    :id="category"
                    :checked="store.state.selectedCategory === category"
                    type="radio"
                    name="category"
                    @input="handleSelectCategory(category)"
                >
            </div>
        </div>
        <div class="start-button-container">
            <button
                class="start-button"
                @click="startQuiz"
            >
                Start Quiz
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import { categories } from '@/constants';
import { useStore } from '@/store';


export default defineComponent({
    setup() {
        const store = useStore();


        const { push } = useRouter();

        const startQuiz = async () => {
            await store.dispatch('fetchQuestions');
            push({ name: 'Question', params: { id: 1 } });
        };

        const handleSelectCategory = (value: string) => {
            store.commit('setSelectedCategory', value);
        };

        return { store, startQuiz, categories, handleSelectCategory };
    },
});
</script>

<style lang="scss" scoped>
.start-button-container {
    display: flex;
    justify-content: center;

    .start-button {
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
}

.categories {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--space-2);
}

.category {
    label {
        font-size: 1.6rem;
        text-transform: uppercase;
    }
}
</style>
