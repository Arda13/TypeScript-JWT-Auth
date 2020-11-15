import { User } from "./entities/User";

export type Lazy<T> = T | Promise<T>;

export type Context = {
    user?: User | null;
}