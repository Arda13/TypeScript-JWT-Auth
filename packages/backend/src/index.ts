import "reflect-metadata";
import { AuthChecker, buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { AuthResolver } from "./resolvers/AuthResolver";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Subscription } from "./entities/Subscription";
import { Context } from "./types";
import { HomeResolver } from "./resolvers/HomeResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { SubscriptionResolver } from "./resolvers/SubscriptionResolver";

async function main() {
    await createConnection(require('../ormconfig.json'));
    await Subscription.delete({}) 
    
    const authChecker: AuthChecker<Context> = (
        { root, args, context, info },
        roles,
    ) => {
        if (context.user) {
            return true;
        }
        return false;
    }

    const schema = await buildSchema({
        resolvers: [AuthResolver, HomeResolver, UserResolver, SubscriptionResolver],
        emitSchemaFile: true,
        authChecker,
    });

   
    new ApolloServer({
        schema,
        async context({ req }): Promise<Context>  {
            const [, jwtHeader] = req.get("authorization")?.split("Bearer ") ?? [];
            
            if (jwtHeader) {
                return {
                    user: await User.fromJWT(jwtHeader)
                }
            }

            return {};
        },
    }).listen(4000, () => {
        console.log("apollo server running on 4000");
    });
}

main();