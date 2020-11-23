import { Arg, Authorized, Ctx, ID, Mutation, Resolver } from "type-graphql"
import { Subscription } from "../entities/Subscription"
import { User } from "../entities/User"
import { AuthorizedContext } from "../types"

@Resolver()
export class SubscriptionResolver{
    @Authorized()
    @Mutation(()=> User)
    async subscribe(
        @Arg("user", () => ID) otherUserId: string,
        @Ctx() { user }: AuthorizedContext
    ) {
        const otherUser = await User.findOneOrFail(otherUserId);
        
        const sub = Subscription.create({
            fromUser: user,
            toUser: otherUser,
        });

        await sub.save();
        return otherUser;
    }
}