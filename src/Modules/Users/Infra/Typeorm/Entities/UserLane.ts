import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm'

@Entity('duo_users_lanes')
class UserLane {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  @Generated('uuid')
  user_id: string

  @Column('uuid')
  @Generated('uuid')
  lane_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default UserLane
