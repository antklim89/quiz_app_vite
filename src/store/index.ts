import { createStore, useStore as baseUseStore, Store as BaseStore } from 'vuex'

import { IQuestion, AnswersVariants, SelectedAnswersVariants } from '@/types'


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
                .filter((answer) => answer[1]) as [AnswersVariants, string][]
        },
        results(state) {
            return state.questions.map((question) => {
                // const corectAnswers = Object.entries(question.correct_answers)
                //     .filter(([, isCorect]) => isCorect)
                //     .map(([name]) => name.replace(/_correct$/i, ''))

                // const selectedAnswers = Object.entries(question.selected_answers)
                //     .filter(([, isSelected]) => isSelected)
                //     .map(([name]) => name)

                const isCorrect = Object.entries(question.correct_answers).every(([key, isCorrect]) => {
                    const answerName = key.replace(/_correct$/i, '') as SelectedAnswersVariants
                    const selectedAnswer = question.selected_answers[answerName]
                    return selectedAnswer === isCorrect
                })

                return {
                    id: question.id,
                    question: question.question,
                    explanation: question.explanation,
                    category: question.category,
                    difficulty: question.difficulty,
                    isCorrect,
                }
            })
        },
    },
})


interface State {
    questions: IQuestion[]
    questionNumber: number
}

interface Result {
    id: 1
    question: string
    explanation: string
    category: string
    difficulty: string
    isCorrect: boolean
}

interface Store extends Omit<BaseStore<State>, 'getters'> {
    getters: {
        currentQuestion: IQuestion | null
        hasQuestions: boolean
        hasSelectedAnswer: boolean
        hasNextQuestion: boolean
        hasPrevQuestion: boolean
        filtredAnswers:[AnswersVariants, string][]
        results: Result[]
    }
}

export function useStore(): Store {
    return baseUseStore()
}
