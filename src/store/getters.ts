import { GetterTree } from 'vuex';

import { State } from './state';

import { IQuestion, AnswerLetters } from '@/types';


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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GettersReturns<T extends Record<string, (...args: any) => any>> = {
    [K in keyof T]: ReturnType<T[K]>;
};

export type Getters = {
    currentQuestion(state: State, g: GettersReturns<Getters>): IQuestion | undefined;
    hasQuestions(state: State): boolean;
    hasNextQuestion(state: State): boolean;
    hasPrevQuestion(state: State): boolean;
    hasSelectedAnswer(state: State, getters: GettersReturns<Getters>): boolean;
    allQuestionsAnswered(state: State): boolean;
    filtredAnswers(state: State, getters: GettersReturns<Getters>): [AnswerLetters, string][];
    results(state: State): Result[];
    allQuestionsAnsweredCorrect(state: State, getters: GettersReturns<Getters>): boolean;
    numberCorrectAnsweres(state: State, getters: GettersReturns<Getters>): number;
    numberWrongAnsweres(state: State, getters: GettersReturns<Getters>): number;
};

export const getters: GetterTree<State, State> & Getters = {
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
    hasSelectedAnswer(state, g) {
        const question = g.currentQuestion;
        if (!question?.answers) return false;
        return Object.values(question.selectedAnswers).some((answer) => answer);
    },
    allQuestionsAnswered(state) {
        if (state.questions.length === 0) return false;
        return state.questions.every((question) => {
            return Object.values(question.selectedAnswers).some((answer) => answer);
        });
    },
    filtredAnswers(state, g) {
        return Object.entries(g.currentQuestion?.answers || {})
            .filter((answer) => answer[1]) as [AnswerLetters, string][];
    },
    results(state): Result[] {
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
    allQuestionsAnsweredCorrect(state, g) {
        return g.results.every((result) => result.isCorrect);
    },
    numberCorrectAnsweres(state, g) {
        return g.results.filter((result) => result.isCorrect).length;
    },
    numberWrongAnsweres(state, g) {
        return g.results.filter((result) => !result.isCorrect).length;
    },
};
