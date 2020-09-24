import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'

import Lane from './Lane'
import Champion from './Champion'
import { Exclude, Expose } from 'class-transformer'
import uploadConfig from '@Config/upload'

import Chat from '@Modules/Chat/Infra/Typeorm/Entities/Chat'
import Message from '@Modules/Chat/Infra/Typeorm/Entities/Message'
import Like from '@Modules/LikeDislike/Infra/Typeorm/Entities/Like'
import Dislike from '@Modules/LikeDislike/Infra/Typeorm/Entities/Dislike'
import Highlight from '@Modules/Highlight/Infra/Typeorm/Entities/Highlight'
import Elo from './Elo'

@Entity('duo_users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column()
  avatar: string

  @Column()
  status: boolean

  @OneToMany(() => Elo, elo => elo.user)
  elos: Elo[]

  @OneToMany(() => Chat, chat => chat.user1)
  chats: Chat[]

  @OneToMany(() => Message, message => message.user)
  messages: Message[]

  @OneToMany(() => Like, like => like.user)
  likes: Like[]

  @OneToMany(() => Dislike, dislike => dislike.user)
  dislikes: Dislike[]

  @ManyToMany(() => Lane)
  @JoinTable()
  lanes: Lane[]

  @OneToMany(() => Highlight, highlight => highlight.user)
  highlights: Highlight[]

  @ManyToMany(() => Champion)
  @JoinTable()
  champions: Champion[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`
      default:
        return null
    }
  }
}

export default User
