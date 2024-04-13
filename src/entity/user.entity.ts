import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    nullable: false,
  })
  firstName: string;

  @Column({
    type: "text",
    nullable: false,
  })
  lastName: string;

  @Column({
    type: "text",
    nullable: false,
  })
  email: string;

  @Column({
    type: "text",
    nullable: false,
  })
  password: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date;
}
