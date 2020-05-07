/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm'

import { hash } from 'bcryptjs'
import Champion from './Champion'
import Lane from './Lane'

@Entity('users')
class User {
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

  @Column()
  champions: string

  @Column()
  lanes: string

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
  async modifyPassword(): Promise<void> {
    console.log(this.password)
    const hashedPassword = await hash(this.password, 8)
    this.password = hashedPassword
  }
}

export default User
