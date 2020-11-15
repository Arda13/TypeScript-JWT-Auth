import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import SecurePassword from "secure-password";
import { Post } from "./Post";
import { Lazy } from "../types"
import jwt from "jsonwebtoken"


const pwd = new SecurePassword();
const JWT_SECRET = "something-here-dont-leak-it"

enum UserType {
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

    @Field(() => UserType)
    @Column( {default: UserType.VIEWER})
    type!: UserType;

    @Column({ type: "blob"})
    passwordHash!: Buffer;

    @OneToMany(() => Post, post => post.user, {lazy:true} )
    posts!: Lazy<Post[]>;

    async setPassword(password: string) {
        this.passwordHash =  await pwd.hash(Buffer.from(password));
    }
    async verifyPassword(password: string) {
        return await pwd.verify(
            Buffer.from(password),
            this.passwordHash);
    }

    jwt() {
        return jwt.sign(
        {
            id: this.id
        },
        JWT_SECRET,
        {expiresIn: "1h"}
        );
    }
}