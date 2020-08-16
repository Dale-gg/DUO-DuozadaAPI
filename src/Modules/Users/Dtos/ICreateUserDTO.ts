import Lane from '../Infra/Typeorm/Entities/Lane'
import Champion from '../Infra/Typeorm/Entities/Champion'

export default interface ICreateUserDTO {
  name: string
  email: string
  password: string
  lanes?: Lane[]
  champions?: Champion[]
}
