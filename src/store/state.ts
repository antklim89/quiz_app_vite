import { CATEGORIES } from '../constants';

import { IQuestion } from '@/types';


export const state = {
    questions: [] as IQuestion[],
    questionNumber: 1,
    selectedCategory: CATEGORIES[0],
};

export type State = typeof state;
