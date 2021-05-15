const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolver');

const WeatherAPI = require('./datasource');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    weatherAPI: new WeatherAPI(),
  }),
  engine: {
    variant: 'current',
  },
});

server.listen().then(({ url }) => {
  console.log(`🐕 doggo says let's go to ${url}`);
});
