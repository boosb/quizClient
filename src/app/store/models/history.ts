import { ICurrentHistory } from "./current-history"
import { IHistoryQuizzes } from "./history-quizzes"

export interface IHistory {
    currentHistory: ICurrentHistory
    lastHistoryQuizzes: IHistoryQuizzes | null
}