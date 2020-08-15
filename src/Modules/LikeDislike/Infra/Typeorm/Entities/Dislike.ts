import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import User from '@Modules/Users/Infra/Typeorm/Entities/User'

@Entity('duo_dislikes')
class Dislike {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  user_id: string

  @ManyToOne(() => User, user => user.dislikes)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  target_user_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Dislike
