import { createStore, useStore as baseUseStore, Store as BaseStore } from 'vuex';

import { URL, QUIZ_API_KEY, LIMIT, categories, QUESTIONS_STORAGE_NAME } from '../constants';

import { IQuestion, AnswerLetters, QuestionResponse } from '@/types';
import { transformQuestions } from '@/utils';


export const store = createStore<State>({
    state: () => ({
        questions: [],
        questionNumber: 1,
        selectedCategory: categories[0],
    }),
    actions: {
        initQuestions(context) {
            const questionsString = localStorage.getItem(QUESTIONS_STORAGE_NAME);

            if (questionsString) {
                const questions: IQuestion[] = JSON.parse(questionsString);
                context.commit('setQuestions', questions);
            }
        },
        async fetchQuestions(context) {
            const url = `${URL}?apiKey=${QUIZ_API_KEY}&limit=${LIMIT}&category=${context.state.selectedCategory}`;
            const res = await fetch(url);
            const data: QuestionResponse[] = await res.json();
            const questions = transformQuestions(data);
            return context.commit('setQuestions', questions);
        },
    },
    mutations: {
        setQuestions(state, questions) {
            state.questions = questions;
        },
        setQuestionNumber(state, id: number|string|string[]) {
            state.questionNumber = Number(id);
        },
        setSelectedCategory(state, newValue: string) {
            state.selectedCategory = newValue;
        },
    },
    getters: {
        currentQuestion({ questions, questionNumber }) {
            return questions.find((question) => Number(question.number) === questionNumber);
        },
        hasQuestions({ questions }) {
            return questions.length > 0;
        },
        hasNextQuestion({ questions, questionNumber }) {
            return questionNumber < questions.length;
        },
        hasPrevQuestion({ questionNumber }) {
            return questionNumber > 1;
        },
        hasSelectedAnswer(state, getters: Store['getters']) {
            const question = getters.currentQuestion;
            if (!question?.answers) return false;
            return Object.values(question.selectedAnswers).some((answer) => answer);
        },
        allQuestionsAnswered(state) {
            if (state.questions.length === 0) return false;
            return state.questions.every((question) => {
                return Object.values(question.selectedAnswers).some((answer) => answer);
            });
        },
        filtredAnswers(state, getters: Store['getters']) {
            return Object.entries(getters.currentQuestion?.answers || {})
                .filter((answer) => answer[1]) as [AnswerLetters, string][];
        },
        results(state) {
            return state.questions.map((question) => {
                const isCorrect = Object.entries(question.correctAnswers).every(([key, isCorrectAnswer]) => {
                    const answerName = key as AnswerLetters;
                    const selectedAnswer = question.selectedAnswers[answerName];
                    return selectedAnswer === isCorrectAnswer;
                });

                const correctAnswers = Object.entries(question.correctAnswers)
                    .filter(([, isCorrectAnswer]) => isCorrectAnswer)
                    .map(([key]) => question.answers[key as AnswerLetters]);

                const selectedAnswer = Object.entries(question.selectedAnswers)
                    .filter(([, isSelected]) => isSelected)
                    .map(([key]) => question.answers[key as AnswerLetters]);

                return {
                    id: question.id,
                    question: question.question,
                    explanation: question.explanation,
                    category: question.category,
                    difficulty: question.difficulty,
                    isCorrect,
                    correctAnswers,
                    selectedAnswer,
                };
            });
        },
        allQuestionsAnsweredCorrect(state, getters: Store['getters']) {
            return getters.results.every((result) => result.isCorrect);
        },
        numberCorrectAnsweres(state, getters: Store['getters']) {
            return getters.results.filter((result) => result.isCorrect).length;
        },
        numberWrongAnsweres(state, getters: Store['getters']) {
            return getters.results.filter((result) => !result.isCorrect).length;
        },
    },
});


interface State {
    questions: IQuestion[]
    questionNumber: number
    selectedCategory: string
}

interface Result {
    id: number;
    question: string;
    explanation: string;
    category: string;
    difficulty: string;
    isCorrect: boolean;
    correctAnswers: string[];
    selectedAnswer: string[];
}

interface Store extends Omit<BaseStore<State>, 'getters'> {
    getters: {
        currentQuestion: IQuestion | null
        hasQuestions: boolean
        hasSelectedAnswer: boolean
        allQuestionsAnswered: boolean
        hasNextQuestion: boolean
        hasPrevQuestion: boolean
        filtredAnswers:[AnswerLetters, string][]
        results: Result[]
        allQuestionsAnsweredCorrect: boolean
        numberCorrectAnsweres: boolean
        numberWrongAnsweres: boolean
    }
}

export const useStore = (): Store => baseUseStore();
