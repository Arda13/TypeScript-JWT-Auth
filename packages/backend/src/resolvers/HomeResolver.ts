import { Field, ObjectType, Query, Resolver} from "type-graphql"
import { Post } from "../entities/Post"

@ObjectType()
class HomePage {
    @Field(() => [Post])
    posts!: Post[]
}

@Resolver()
export class HomeResolver {
    @Query(() => HomePage)
    home() {

    }
}
