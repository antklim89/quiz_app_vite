import { createStore, useStore as baseUseStore, Store as BaseStore } from 'vuex';

import { IQuestion, AnswerLetters } from '@/types';
import { transformQuestions } from '@/utils';


export const store = createStore<State>({
    state: {
        questions: [],
        questionNumber: 1,
    },
    actions: {
        async fetchQuestions(context) {
            const res = await fetch('/questions.json');
            const data = await res.json();

            context.state.questions = transformQuestions(data);
        },
    },
    mutations: {
        setQuestionNumber(state, id: number|string|string[]) {
            state.questionNumber = Number(id);
        },
    },
    getters: {
        currentQuestion({ questions, questionNumber }) {
            return questions.find((question) => Number(question.id) === questionNumber);
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
                const isCorrect = Object.entries(question.correctAnswers).every(([key, isCorrect]) => {
                    const answerName = key as AnswerLetters;
                    const selectedAnswer = question.selectedAnswers[answerName];
                    return selectedAnswer === isCorrect;
                });

                const correctAnswers = Object.entries(question.correctAnswers)
                    .filter(([, isCorrect]) => isCorrect)
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
