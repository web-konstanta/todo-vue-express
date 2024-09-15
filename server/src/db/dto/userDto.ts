import UserData from "../../types/userData.js"

export default class UserDto {
    id: Number
    email: String
    name: String

    constructor(user: UserData) {
        this.id = user.id
        this.email = user.email
        this.name = user.name
    }
}