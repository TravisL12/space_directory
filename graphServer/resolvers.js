module.exports = {
  Query: {
    starWars: (_, { id, type }, { dataSources }) =>
      dataSources.starWarsAPI.getData({ id, type }),
    starWarsFilm: (_, { title }, { dataSources }) =>
      dataSources.starWarsFilmsAPI.getData({ title }),
  },
};
