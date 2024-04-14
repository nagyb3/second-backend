import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./post.entity";

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

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date;
}
