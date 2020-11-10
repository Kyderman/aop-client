import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

import fetch from "isomorphic-unfetch";
import { WebSocketLink } from "@apollo/client/link/ws";

const isBrowser = typeof window !== "undefined";

export default function createApolloClient(initialState, ctx) {
  const ssrMode = typeof window === "undefined";

  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_SERVER,
    credentials: "same-origin",
    fetch,
  });

  const wsLink = () => {
    return new WebSocketLink({
      uri: process.env.GRAPHQL_WS_SERVER,
      options: {
        reconnect: true,
        connectionParams: () => {
          const token = getAuthToken();

          return {
            authToken: `Bearer ${token}`,
          };
        },
      },
    });
  };

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getAuthToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const getAuthToken = () => {
    return localStorage.getItem("auth-token");
  };

  let splitLink;

  if (ssrMode) {
    // on Server...

    splitLink = authLink.concat(httpLink);
  } else {
    // on Client...

    splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink(),
      authLink.concat(httpLink)
    );
  }

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode,
    link: splitLink,
    cache: new InMemoryCache().restore(initialState),
  });
}
