import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import passEncoded from '../Utils/passEncoded'
import User, { IUser, IUserObject } from '../Models/user.model'
import { Secret } from "../Utils/jwt";

export default class UserService {
  public async index (req: Request, res: Response) {
    const list: Array<IUserObject> = await User.find({})

    return res.json({ msg: 'Index', list })
  }

  public async login (req: Request, res: Response) {
    const iUser = req.body as IUser
    let user = await User.findOne({ email: iUser.email, password: iUser.password })

    if (!user) {
      return res.status(403).json({ 
        status: 403,
        type: 'no-match', 
        msg: 'Email e senha não batem com nossa base de dados'
      })
    }

    const token = jwt.sign({user}, Secret)

    return res.status(200).json({ 
      status: 200,
      type: 'success-register', 
      msg: 'Bem vindo a BraPay :)', 
      auth: true, 
      token: token 
    })
  }

  public async store (req: Request, res: Response) {
    const iUser = req.body as IUser
    let findUser = await User.findOne({email: iUser.email});

    if (findUser) {
      return res.status(400).json({ 
        status: 400,
        type: 'already-registered', 
        msg: `O email ${iUser.email} já foi cadastrado!` 
      })
    }

    iUser.password = await passEncoded(iUser.password, 10)
    const user = await User.create(iUser)

    const token = jwt.sign({user}, Secret)

    return res.status(200).json({ 
      status: 200,
      type: 'success-register', 
      msg: 'Bem vindo a BraPay :)', 
      auth: true, 
      token: token 
    })
  }

  public async show (req: Request, res: Response) {
    const user = await User.findById(req.params.id)

    return res.json({ msg: 'Show', user })
  }

  public async destroy (req: Request, res: Response) {
    await User.findByIdAndRemove({ _id: req.params.id})

    return res.status(204).json({ msg: 'Destroy' })
  }
}
