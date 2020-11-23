import { types } from "mobx-state-tree";

const JWT_STORE_KEY = "do-not-do-this-use-cookies-instead"

export const User = types.model({
    jwt: localStorage.getItem(JWT_STORE_KEY) ?? "",

    }).actions((self) => ({
    setJWT(jwt: string) {
        self.jwt = jwt;
        localStorage.setItem(JWT_STORE_KEY, jwt);
    }
    }))