export interface IQuestion {
    id: 1
    question: string
    description: string
    answers: {
      answer_a: string
      answer_b: string
      answer_c: string
      answer_d: string
      answer_e: string
      answer_f: string
    }
    multiple_correct_answers: boolean
    correct_answers: {
      answer_a_correct: boolean
      answer_b_correct: boolean
      answer_c_correct: boolean
      answer_d_correct: boolean
      answer_e_correct: boolean
      answer_f_correct: boolean
    }
    selected_answers: {
      answer_a: boolean
      answer_b: boolean
      answer_c: boolean
      answer_d: boolean
      answer_e: boolean
      answer_f: boolean
    }
    explanation: string
    tip: string|null
    tags: string[]
    category: string
    difficulty: string
}

export type AnswersVariants = keyof IQuestion['answers']
export type CorrectAnswersVariants = keyof IQuestion['correct_answers']
export type SelectedAnswersVariants = keyof IQuestion['selected_answers']
