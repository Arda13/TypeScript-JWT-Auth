import { User } from "./entities/User";

export type Lazy<T> = T | Promise<T>;


export type AuthorizedContext = {
    user: User;

};

export type UnauthorizedContext =  {
    user?: null;
};

export type Context = AuthorizedContext | UnauthorizedContext;