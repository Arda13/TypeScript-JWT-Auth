import { types } from "mobx-state-tree";

import { User } from "./User";

export const RootModel = types.model({
    user: User,
})