export interface IHistoryQuizzes {
    id?: number
    history: {
        [key:number]: number
    }
    userId: number
    quizId: number
}