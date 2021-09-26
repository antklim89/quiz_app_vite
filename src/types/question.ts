export interface QuestionResponse {
    id: number
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
    explanation: string
    tip: string|null
    tags: string[]
    category: string
    difficulty: string
}

export type AnswerLetters = 'a'|'b'|'c'|'d'|'e'|'f'

export interface IQuestion {
  id: number
  number: number
  question: string
  description: string
  answers: Record<AnswerLetters, string>
  multipleCorrectAnswers: boolean
  correctAnswers: Record<AnswerLetters, boolean>
  selectedAnswers: Record<AnswerLetters, boolean>
  explanation: string
  tip: string|null
  tags: string[]
  category: string
  difficulty: string
}
