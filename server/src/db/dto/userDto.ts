import UserData from '../../types/userData.js'

export default class UserDto {
    id: number
    email: string
    name: string
    verifiedAt?: Date

    constructor(user: UserData) {
        this.id = user.id
        this.email = user.email
        this.name = user.name
        this.verifiedAt = user.verifiedAt
    }
}