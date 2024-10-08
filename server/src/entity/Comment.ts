import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  content!: string

  @Column()
  user_id!: number

  @Column()
  user_name!: string

  @Column()
  media_type!: string

  @Column()
  media_id!: number
}
