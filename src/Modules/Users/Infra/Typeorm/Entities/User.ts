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

import Like from '@Modules/LikeDislike/Infra/Typeorm/Entities/Like'
import Dislike from '@Modules/LikeDislike/Infra/Typeorm/Entities/Dislike'

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
  status: string

  @OneToMany(() => Like, like => like.user)
  likes: Like[]

  @OneToMany(() => Dislike, dislike => dislike.user)
  dislikes: Dislike[]

  @ManyToMany(() => Lane)
  @JoinTable()
  lanes: Lane[]

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
