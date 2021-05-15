import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/',
});

client
  .query({
    query: gql`
      query TestQuery {
        launch(id: 56) {
          id
          mission {
            name
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));
