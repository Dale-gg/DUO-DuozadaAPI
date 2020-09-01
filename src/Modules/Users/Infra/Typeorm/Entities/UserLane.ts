import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm'

@Entity('duo_users_lanes_duo_lanes')
class UserLane {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  @Generated('uuid')
  duoUsersId: string

  @Column('uuid')
  @Generated('uuid')
  duoLanesId: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default UserLane
