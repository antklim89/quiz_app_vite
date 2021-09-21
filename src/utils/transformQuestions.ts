import { IQuestion, QuestionResponse } from '../types'


export function transformQuestions(questions: QuestionResponse[]): IQuestion[] {
    return questions.map((question) => ({
        id: question.id,
        category: question.category,
        description: question.description,
        difficulty: question.difficulty,
        explanation: question.explanation,
        question: question.question,
        tags: question.tags,
        tip: question.tip,
        multipleCorrectAnswers: question.multiple_correct_answers,
        correctAnswers: {
            a: question.correct_answers.answer_a_correct,
            b: question.correct_answers.answer_b_correct,
            c: question.correct_answers.answer_c_correct,
            d: question.correct_answers.answer_d_correct,
            e: question.correct_answers.answer_e_correct,
            f: question.correct_answers.answer_f_correct,
        },
        selectedAnswers: {
            a: false,
            b: false,
            c: false,
            d: false,
            e: false,
            f: false,
        },
        answers: {
            a: question.answers.answer_a,
            b: question.answers.answer_b,
            c: question.answers.answer_c,
            d: question.answers.answer_d,
            e: question.answers.answer_e,
            f: question.answers.answer_f,
        },
    }))
}
