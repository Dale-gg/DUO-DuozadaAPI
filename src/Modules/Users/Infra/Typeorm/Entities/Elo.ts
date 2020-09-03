import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import User from './User'

import uploadConfig from '@Config/upload'
import { Expose } from 'class-transformer'

@Entity('duo_elos')
class Elo {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  tier: string

  @Column()
  rank: string

  @Column('varchar')
  image_url: string

  @Column()
  season: string

  @Column()
  game_mode: string

  @Column()
  user_id: string

  @ManyToOne(() => User, user => user.elos)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    if (!this.image_url) {
      return null
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/elos/${this.image_url}`
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/elos/${this.image_url}`
      default:
        return null
    }
  }
}

export default Elo
