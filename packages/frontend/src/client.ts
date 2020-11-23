import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { rootStore } from './models';

const httpLink = createHttpLink({
    uri:"http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {

    return {
        headers: {
            ...headers,
            authorization: rootStore.user.jwt ? `Bearer ${rootStore.user.jwt}` : "",
        }
    }
});
export default new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
}); 