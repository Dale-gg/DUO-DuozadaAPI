import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import Chat from '@Modules/Chat/Infra/Typeorm/Entities/Chat'
import User from '@Modules/Users/Infra/Typeorm/Entities/User'

@Entity('duo_messages')
class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  body: string

  @Column()
  user_id: string

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  chat_id: string

  @ManyToOne(() => Chat, chat => chat.messages)
  @JoinColumn({ name: 'chat_id' })
  chat: Chat

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Message
