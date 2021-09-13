import { createStore, useStore as baseUseStore, Store as BaseStore } from 'vuex'

import { IQuestion, AnswersVariants } from '@/types'


export const store = createStore<State>({
    state: {
        questions: [],
        questionNumber: 1,
    },
    actions: {
        async fetchQuestions(context) {
            const res = await fetch('/questions.json')
            const data = await res.json()

            context.state.questions = data.map((question: IQuestion) => ({
                ...question,
                selected_answers: {
                    answer_a: false,
                    answer_b: false,
                    answer_c: false,
                    answer_d: false,
                    answer_e: false,
                    answer_f: false,
                },
            }))
        },
    },
    mutations: {
        setQuestionNumber(state, id: number|string|string[]) {
            state.questionNumber = Number(id)
        },
    },
    getters: {
        currentQuestion({ questions, questionNumber }) {
            return questions.find((question) => Number(question.id) === questionNumber)
        },
        hasQuestions({ questions }) {
            return questions.length > 0
        },
        hasNextQuestion({ questions, questionNumber }) {
            return questionNumber < questions.length
        },
        hasPrevQuestion({ questionNumber }) {
            return questionNumber > 1
        },
        hasSelectedAnswer(state, getters) {
            const question = getters.currentQuestion
            if (!question?.answers) return false
            return Object.values(question.selected_answers).some((answer) => answer)
        },
        filtredAnswers(state, getters) {
            return Object.entries(getters.currentQuestion.answers)
                .filter((answ) => answ[1]) as [AnswersVariants, string][]
        },
    },
})


interface State {
    questions: IQuestion[]
    questionNumber: number
}

interface Store extends Omit<BaseStore<State>, 'getters'> {
    getters: {
        currentQuestion: IQuestion | null
        hasQuestions: boolean
        hasSelectedAnswer: boolean
        hasNextQuestion: boolean
        hasPrevQuestion: boolean
        filtredAnswers:[AnswersVariants, string][]
    }
}

export function useStore(): Store {
    return baseUseStore()
}
