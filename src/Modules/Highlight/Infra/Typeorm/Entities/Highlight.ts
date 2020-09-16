import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { Expose } from 'class-transformer'
import uploadConfig from '@Config/upload'

import User from '@Modules/Users/Infra/Typeorm/Entities/User'

@Entity('duo_highlights')
class Highlight {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  desc: string

  @Column()
  media: string

  @Column()
  user_id: string

  @ManyToOne(() => User, user => user.highlights)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'media_url' })
  getMediaUrl(): string | null {
    if (!this.media) {
      return null
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.media}`
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.media}`
      default:
        return null
    }
  }
}

export default Highlight
