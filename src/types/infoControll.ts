export class Iuser {
    readonly id: string
    readonly lastname: string
    readonly firstname: string
    readonly isActive: boolean
    readonly email: string
    readonly password: string
    readonly role: string
}

export interface Itoken {

    refreshToken: string
    UserId: string
}

export interface Ipayload {
    id: string
    email: string
}