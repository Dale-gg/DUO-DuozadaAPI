import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'
import { ILaneObject } from '../Interfaces/ILane'

@Entity('duo_lanes')
class Lane implements ILaneObject {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

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
