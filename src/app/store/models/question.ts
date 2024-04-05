import { IAnswer } from "./answer"

export interface IQuestion {
    id?: number
    text: string
    quizId: number | null | undefined // todo хотя по идеи null быть не может, так как не нужны нам вопросы без викторины
    answers?: IAnswer[] | null | undefined
}