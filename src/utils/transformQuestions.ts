import { IQuestion, QuestionResponse } from '../types';


export function transformQuestions(questions: QuestionResponse[]): IQuestion[] {
    return questions.map((question, index) => ({
        number: index + 1,
        id: question.id,
        category: question.category,
        description: question.description,
        difficulty: question.difficulty,
        explanation: question.explanation,
        question: question.question,
        tags: question.tags,
        tip: question.tip,
        multipleCorrectAnswers: question.multiple_correct_answers === 'true',
        correctAnswers: {
            a: question.correct_answers.answer_a_correct === 'true',
            b: question.correct_answers.answer_b_correct === 'true',
            c: question.correct_answers.answer_c_correct === 'true',
            d: question.correct_answers.answer_d_correct === 'true',
            e: question.correct_answers.answer_e_correct === 'true',
            f: question.correct_answers.answer_f_correct === 'true',
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
    }));
}
