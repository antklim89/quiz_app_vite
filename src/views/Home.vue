<template>
    <div class="container">
        <div class="categories">
            <div
                v-for="category in CATEGORIES"
                :key="category"
                class="category"
            >
                <input
                    :id="category"
                    :checked="store.state.selectedCategory === category"
                    type="radio"
                    name="category"
                    @input="handleSelectCategory(category)"
                >
                <label
                    :for="category"
                    :class="{checked: store.state.selectedCategory === category}"
                >
                    {{ category }}
                </label>
            </div>
        </div>
        <div class="button-group">
            <div>
                <router-link
                    v-if="store.getters.hasQuestions"
                    class="button"
                    :class="{loading: loading}"
                    :disabled="loading"
                    :to="{name: 'Question', params: { id: 1 }}"
                >
                    Continue
                </router-link>
            </div>
            <div>
                <button
                    class="button"
                    :class="{loading: loading}"
                    :disabled="loading"
                    @click="startQuiz"
                >
                    Start New
                </button>
            </div>
            <div>
                <router-link
                    v-if="store.getters.allQuestionsAnswered"
                    class="button"
                    :class="{loading: loading}"
                    :disabled="loading"
                    :to="{name: 'Result'}"
                >
                    Show Results
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { CATEGORIES } from '@/constants';
import { useStore } from '@/store';


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
        if (error instanceof Error) errorMessage.value = error.message;
    } finally {
        loading.value = false;
    }
};

const handleSelectCategory = (value: string) => {
    store.commit('setSelectedCategory', value);
};

</script>

<style lang="scss" scoped>
.categories {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: var(--sp-2);

    @media screen and (min-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1080px) {
        grid-template-columns: repeat(3, 1fr);
    }
}

.category {
    padding: var(--sp-2);
    display: flex;

    label {
        --outline-width: 2px;
        font-size: var(--fs-lg);
        text-transform: uppercase;
        width: 100%;
        box-shadow: 0 0 0px var(--outline-width) var(--primary-color);
        padding: var(--sp-2);
        cursor: pointer;
        text-align: center;
        transition: 100ms;
        border-radius: 9999px;
    }

    input:focus + label  {
        outline: 2px solid var(--focus-color);
        outline-offset: -2px;
    }

    input:checked + label {
        --outline-width: 8px;
    }

    input {
        outline: none;
        width: 0;
        height: 0;
    }
}
</style>
