/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import { hash } from 'bcryptjs'
import { IUserObject } from '../Interfaces/IUser'
import Champion from './Champion'
import Lane from './Lane'

@Entity('duo_users')
class User implements IUserObject {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  avatar: string

  @ManyToMany(() => Champion)
  @JoinTable()
  champions: Champion[]

  @ManyToMany(() => Lane)
  @JoinTable()
  lanes: Lane[]

  @Column()
  media: string

  @Column()
  like: string

  @Column()
  dislike: string

  @Column()
  status: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  private async modifyPassword(): Promise<void> {
    const hashedPassword = await hash(this.password, 8)
    this.password = hashedPassword
  }
}

export default User
