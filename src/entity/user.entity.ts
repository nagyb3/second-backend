import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    nullable: true, // TODO
  })
  firstName: string;

  @Column({
    type: "text",
    nullable: true, // TODO
  })
  lastName: string;

  @Column({
    type: "text",
    nullable: true, // TODO change this to true later
  })
  email: string;

  @Column({
    type: "text",
    nullable: true, // TODO change this to true later
  })
  password: string;
}
