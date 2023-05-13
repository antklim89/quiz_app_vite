import { MutationTree } from 'vuex';

import { State } from './state';

import { IQuestion } from '@/types';


export const MutationTypes = {
    setQuestions: 'setQuestions',
    setQuestionNumber: 'setQuestionNumber',
    setSelectedCategory: 'setSelectedCategory',
} as const;
type MutationTypes = typeof MutationTypes[keyof typeof MutationTypes];

export type Mutations<S = State> = {
    [MutationTypes.setQuestions](state: S, questions: IQuestion[]): void;
    [MutationTypes.setQuestionNumber](state: S, id: number | string | string[]): void;
    [MutationTypes.setSelectedCategory](state: S, newValue: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.setQuestions](state, questions) {
        state.questions = questions;
    },
    [MutationTypes.setQuestionNumber](state, id) {
        state.questionNumber = Number(id);
    },
    [MutationTypes.setSelectedCategory](state, newValue) {
        state.selectedCategory = newValue;
    },
};
