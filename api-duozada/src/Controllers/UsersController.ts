import * as express from 'express'
import CreateUserService from '../Services/CreateUserService'

class UsersController {
    public async store(request: express.Request, response: express.Response){    
        const createUser = new CreateUserService()
    
        const user = await createUser.execute(request.body)
    
        delete user.password
    
        return response.json(user)
    }
}

export default UsersController