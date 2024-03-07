export interface IAnswer {
    id?: number
    text: string
    isRight: boolean
    questionId: number | null | undefined // todo по хорошему null быть не может, ибо не нужны нам ответы без вопроса
}