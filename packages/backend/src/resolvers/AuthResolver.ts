import { AuthenticationError } from "apollo-server";
import SecurePassword from "secure-password";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { Context } from "../types";

@ObjectType()
class AuthResult {
    @Field()
    jwt!: string
}

@Resolver()
export class AuthResolver {
    @Query(() => User, {nullable: true})
    viewer(@Ctx() { user }: Context) {
        return user;
    }

    @Mutation(() => AuthResult)
    async signup(@Arg("name") name: string, @Arg("email") email: string, @Arg("password") password: string){
        const user = User.create({
            email,
            legalName: name,
            displayName: name
        });

        await user.setPassword(password);
        await user.save();
        return {
            jwt: user.jwt(),
        };
    }

    @Mutation(() => AuthResult)
    async signin(
        @Arg('email') email: string,
        @Arg('password') password: string,
        ) {
           const user = await User.findOne({
                where: {

                }
            })

        if (user && (await user?.verifyPassword(password)) === SecurePassword.VALID) {
            return {
                jwt: user.jwt(),
            };
        }

        throw new AuthenticationError(" Invalid password or email")
    }
}