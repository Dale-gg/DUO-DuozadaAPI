import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm'

@Entity('duo_users_champions_gg_champions')
class UserChampion {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  @Generated('uuid')
  duoUsersId: string

  @Column('uuid')
  @Generated('uuid')
  ggChampionsId: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default UserChampion
