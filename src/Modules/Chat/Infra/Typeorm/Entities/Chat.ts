import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import User from '@Modules/Users/Infra/Typeorm/Entities/User'
import Message from '@Modules/Chat/Infra/Typeorm/Entities/Message'

@Entity('duo_chats')
class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  user1_id: string

  @ManyToOne(() => User, user => user.chats)
  @JoinColumn({ name: 'user1_id' })
  user1: User

  @Column()
  user2_id: string

  @ManyToOne(() => User, user => user.chats)
  @JoinColumn({ name: 'user2_id' })
  user2: User

  @OneToMany(() => Message, message => message.chat)
  messages: Message[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Chat
