import { IHistoryQuizzes } from "./history-quizzes"

export interface IUser {
    id?: number // todo у меня везед id стоит как необязательный параметр, но мне так не хочется 
    roleId?: number
    email?: string
    password: string
    token?: string
    isEmailConfirmed?: boolean
    avatar?: string
    alias?: string
    oldEmail?: string // todo поле пока не используется, но мб пригодится при реализации функционала смены email
    role?: any
    historyQuizzes?: IHistoryQuizzes[]
}