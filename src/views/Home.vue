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
        await store.dispatch('fetchQuestions', null);
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

<template>
    <div class="container">
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div
                v-for="category in CATEGORIES"
                :key="category"
                class="category flex"
            >
                <button
                    :class="{checked: store.state.selectedCategory === category}"
                    class="text-lg uppercase w-full shadow p-4 cursor-pointer text-center transition rounded-full"
                    @click="handleSelectCategory(category)"
                >
                    {{ category }}
                </button>
            </div>
        </div>
        <div class="button-group md:grid-cols-3">
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

<style scoped>
.category button.checked {
    @apply outline outline-2 outline-primary-600;
}
</style>
