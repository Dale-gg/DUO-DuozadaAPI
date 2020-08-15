import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'

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
}

export default Lane
