import { Field, ID, Int, ObjectType, registerEnumType,} from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationCount } from "typeorm";
import SecurePassword from "secure-password";
import { Post } from "./Post";
import { Lazy } from "../types"
import jwt from "jsonwebtoken"
import { Subscription } from "./Subscription";


const pwd = new SecurePassword();
const JWT_SECRET = "something-here-dont-leak-it"

export enum UserType {
    VIEWER,
    CREATOR
}

registerEnumType(UserType, {
    name: "UserType",

})

@Entity()
@ObjectType()
export class User extends BaseEntity {
    static fromJWT(token:string) {
        const data = jwt.verify(token, JWT_SECRET) as any;
        if(data) {
            return this.findOne(data.id)
        }
        return null;
    }
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column( {unique:true, collation: "nocase"})
    email!: string;
    
    @Field()
    @Column()
    legalName!: string;

    @Field()
    @Column()
    displayName!: string;

    @Field({ nullable:true })
    @Column({ nullable: true })
    bio!: string;

    @Field(() => UserType)
    @Column( {default: UserType.VIEWER})
    type!: UserType;

    @Column({ type: "blob"})
    passwordHash!: Buffer;

    @OneToMany(() => Post, post => post.user, {lazy:true} )
    posts!: Lazy<Post[]>;

    @OneToMany(() => Subscription, (subscription) => subscription.toUser, {lazy:true} )
    subscribers!: Lazy<Subscription[]>;

    @Field(() => Int)
    @RelationCount("posts")
    postsCount!: number;

    @Field(() => Int)
    @RelationCount("subscribers")
    subscribersCount!: number;

    @OneToMany(() => Subscription, (subscription) => subscription.fromUser, {lazy:true})
    subscriptions!: Lazy<Subscription[]>;

    async setPassword(password: string) {
        this.passwordHash =  await pwd.hash(Buffer.from(password));
    }

    async verifyPassword(password: string) {
        return await pwd.verify(
            Buffer.from(password),
            this.passwordHash);
    }

    async canViewPosts(otherUser: User) {

        if (otherUser.id === this.id) {
            return true
        }


        const subscription = await Subscription.findOne({
            fromUser: this,
            toUser: otherUser
        });

        return !!subscription;
    }

    jwt() {
        return jwt.sign(
        {
            id: this.id
        },
        JWT_SECRET,
        { expiresIn: "1h" }
        );
    }
}