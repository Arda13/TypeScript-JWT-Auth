import { Authorized, Ctx, FieldResolver, Resolver, Root, ForbiddenError, Mutation, Query, Arg, ID } from "type-graphql"
import { Post } from "../entities/Post"
import { User, UserType } from "../entities/User"
import { AuthorizedContext } from "../types"

@Resolver(() => User)
export class UserResolver {
    @Authorized()
    @Query(() => User)
    user(@Arg("id", () => ID) id: string) {
        return User.findOneOrFail(id);
    }

    @Authorized()
    @FieldResolver(() => Boolean)
    isCurrentlySubscribed(@Root() rootUser: User, @Ctx() { user }: AuthorizedContext) {
        return user.canViewPosts(rootUser);

    }

    @FieldResolver(() => [Post])
    async posts(@Root() rootUser: User, @Ctx() { user }: AuthorizedContext){

        if (!(await user.canViewPosts(rootUser))) {
            throw new ForbiddenError();
        }


        return rootUser.posts;

    }

    @Authorized()       
    @Mutation(() => User)
    async convertToCreator(@Ctx() { user }: AuthorizedContext) {

        if (user.type === UserType.CREATOR) {
            throw new Error("You are already a content creator")
        }
        
        user.type = UserType.CREATOR;
        await user.save()

        return user;
    }

}