export interface User {
    email: string,
    username: string,
    password: string,
    xp: number,
    level: number
}

export type UserAuthDto = Pick<User, "email" | "password" | "username">
