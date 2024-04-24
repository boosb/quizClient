import { IHistory } from "../reducers/quiz-game.reducer"

export interface IHistoryQuizzes {
    id?: number
    history: IHistory
    userId: number | undefined  // todo ts заставил добавить undefined, но ваще не оч хочется 
    quizId: number
    dateTime?: Date
}