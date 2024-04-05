export interface IUser {
    role?: any
    id?: number
    roleId?: number
    email?: string
    password: string
    token?: string
    isEmailConfirmed?: boolean
    avatar?: string
    alias?: string
    oldEmail?: string
}