module.exports = {
  Query: {
    starWars: (_, { id, type }, { dataSources }) =>
      dataSources.starWarsAPI.getData({ id, type }),
  },
};
