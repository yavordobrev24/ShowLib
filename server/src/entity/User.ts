import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

@Entity()
@Unique(['email', 'username'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  email!: string

  @Column()
  username!: string

  @Column()
  password!: string
}
