export interface IQuestion {
    id?: number
    text: string
    quizId: number | null // todo хотя по идеи null быть не может, так как не нужны нам вопросы без викторины
}