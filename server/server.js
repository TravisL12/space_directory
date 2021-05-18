//https://medium.com/swlh/no-idea-how-to-get-started-with-graphql-make-a-wrapper-of-a-rest-api-7159080dc318#a388

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const StarWarsAPI = require('./starWarsApi');
const OmdbAPI = require('./omdbAPI');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    starWarsAPI: new StarWarsAPI(),
    omdbAPI: new OmdbAPI(),
  }),
  engine: {
    variant: 'current',
  },
});

server.listen().then(({ url }) => {
  console.log(`🐕 doggo says let's go to ${url}`);
});
