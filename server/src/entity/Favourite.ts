import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Favourite {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  user_id!: number

  @Column()
  media_type!: string

  @Column()
  media_id!: number

  @Column()
  media_title!: string

  @Column()
  media_poster!: string
}
