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
        <div class="button-container">
            <button
                class="button button"
                :class="{loading: loading}"
                :disabled="loading"
                @click="startQuiz"
            >
                Start New
            </button>
            <router-link
                v-if="store.getters.hasQuestions"
                class="button button"
                :class="{loading: loading}"
                :disabled="loading"
                :to="{name: 'Question', params: { id: 1 }}"
            >
                Continue
            </router-link>
            <router-link
                v-if="store.getters.allQuestionsAnswered"
                class="button button"
                :class="{loading: loading}"
                :disabled="loading"
                :to="{name: 'Result'}"
            >
                Show Results
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { CATEGORIES } from '@/constants';
import { useStore } from '@/store';


export default defineComponent({
    setup() {
        const store = useStore();
        const loading = ref(false);
        const errorMessage = ref<string|null>(null);

        const { push } = useRouter();

        const startQuiz = async () => {
            loading.value = true;
            errorMessage.value = null;
            try {
                await store.dispatch('fetchQuestions');
                push({ name: 'Question', params: { id: 1 } });
            } catch (error) {
                if (error instanceof Error) {
                    errorMessage.value = error.message;
                }
            } finally {
                loading.value = false;
            }
        };

        const handleSelectCategory = (value: string) => {
            store.commit('setSelectedCategory', value);
        };

        return {
            store, startQuiz, categories: CATEGORIES, handleSelectCategory, loading, errorMessage,
        };
    },
});
</script>

<style lang="scss" scoped>
.button-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: var(--sp-4) var(--sp-1);

    .button {
        text-align: center;
        font-size: var(--fs-xl);
        border-radius: 0.5rem;
        padding: var(--sp-2);
        margin: 0 var(--sp-2);
    }
}

.categories {
    display: grid;
    grid-template-columns: repeat(var(--cols), 1fr);
    gap: var(--sp-2);
}

.category {
    label {
        font-size: var(--fs-lg);
        text-transform: uppercase;
    }
}
</style>
