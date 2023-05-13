import { ActionContext, ActionTree } from 'vuex';

import { URL, QUESTIONS_STORAGE_NAME } from '../constants';

import { Mutations } from './mutations';
import { State } from './state';

import { IQuestion, QuestionResponse } from '@/types';
import { transformQuestions } from '@/utils';


export const ActionTypes = {
    initQuestions: 'initQuestions',
    fetchQuestions: 'fetchQuestions',
} as const;

type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
    [ActionTypes.fetchQuestions]({ commit }: AugmentedActionContext): Promise<void>;
    [ActionTypes.initQuestions]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<State, State> & Actions = {
    [ActionTypes.initQuestions](context) {
        const questionsString = localStorage.getItem(QUESTIONS_STORAGE_NAME);

        if (questionsString) {
            const questions: IQuestion[] = JSON.parse(questionsString);
            context.commit('setQuestions', questions);
        }
    },
    async [ActionTypes.fetchQuestions](context) {
        const url = `${URL}?category=${context.state.selectedCategory}`;
        const res = await fetch(url);
        const data: QuestionResponse[] = await res.json();
        const questions = transformQuestions(data);
        return context.commit('setQuestions', questions);
    },
};
