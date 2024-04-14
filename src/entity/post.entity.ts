import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Topic } from "./topic.entity";
import { User } from "./user.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
    default: "",
  })
  description: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @ManyToOne(() => Topic, (topic) => topic.posts)
  topic: Topic;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  createdAt: Date;
}
