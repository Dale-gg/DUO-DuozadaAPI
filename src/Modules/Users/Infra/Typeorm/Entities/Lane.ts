// @ts-nocheck

import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'

import { Expose } from 'class-transformer'
import uploadConfig from '@Config/upload'

@Entity('duo_lanes')
class Lane {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  prefix: string

  @Column('varchar', {
    array: true,
    default: () => 'array[]::varchar[]',
    nullable: true,
  })
  icons: string[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'icons_url' })
  getImageUrl(): string | null {
    if (!this.icons) {
      return null
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return this.icons.map(icon => {
          return `${process.env.APP_API_URL}/files/lanes/${icon}`
        })
      case 's3':
        return this.icons.map(icon => {
          return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/lanes/${icon}`
        })
      default:
        return null
    }
  }
}

export default Lane
