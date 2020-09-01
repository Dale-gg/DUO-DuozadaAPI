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
}

export default Elo
