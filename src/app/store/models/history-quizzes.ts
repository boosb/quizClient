import { ICurrentHistory } from "./current-history"

export interface IHistoryQuizzes {
    id?: number
    history: ICurrentHistory
    userId: number | undefined  // todo ts заставил добавить undefined, но ваще не оч хочется 
    quizId: number
    dateTime?: Date
}