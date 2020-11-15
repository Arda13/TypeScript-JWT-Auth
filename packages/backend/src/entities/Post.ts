import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lazy } from "../types";
import { User } from "./User";


enum PostType {
    TEXT,
    VIDEO,
    PHOTO
}

registerEnumType(PostType, {
    name: "PostType"
})

@ObjectType()
@Entity()
export class Post extends BaseEntity { 
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;


    @Field(() => PostType)
    @Column()
    type!: PostType;

    @Field({nullable: true})
    @Column({ nullable: true})
    text?: string;


    @Field()
    @Column()
    assetUrl!: string;

    @ManyToOne(() => User, (user) => user.posts, {lazy:true})
    user!: Lazy<User>;

}