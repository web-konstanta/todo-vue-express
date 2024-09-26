import UserData from './userData.js'

type JwtPayload = Pick<UserData, 'id' | 'email'>

export default JwtPayload