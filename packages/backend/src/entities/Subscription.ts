import { Field, ID } from "type-graphql";
import { BaseEntity, BeforeInsert, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { User, UserType } from "./User";

@Entity()
@Unique(["fromUser", "toUser"])
export class Subscription extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Date)
  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.subscriptions)
  fromUser!: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.subscribers)
  toUser!: User;

  @BeforeInsert()
  async sanityCheck() {
    if ( this.fromUser.id ===  this.toUser.id) {
      throw new Error("You cannot subsribe to yourself");
    }
    
    if ( this.toUser.type !==  UserType.CREATOR) {
        throw new Error("You cannot subsribe to content creators");
      }
  }
}