import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('duo_duozadas')
class Duozada {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  like1_id: string

  @Column()
  like2_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Duozada
