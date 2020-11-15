import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { AuthResolver } from "./resolvers/AuthResolver";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Context } from "./types";

async function main() {
    await createConnection(require('../ormconfig.json'));
    const schema = await buildSchema({
        resolvers: [AuthResolver],
        emitSchemaFile: true

    });

    new ApolloServer({
        schema,
        async context({req,res}): Promise<Context>  {
            const jwtHeader = req.get("x-wholenoods-token" )
            if (jwtHeader) {
                return {
                    user: await User.fromJWT(jwtHeader)
                }
            }

            return {};
        }
    }).listen(4000, () => {
        console.log("apollo server running on 4000");
    });
}

main();