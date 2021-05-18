module.exports = {
  Query: {
    starWarsPeople: (_, { id }, { dataSources }) => {
      if (id) {
        return dataSources.starWarsAPI.getData({ id });
      }
    },
    starWarsVehicle: (_, { id }, { dataSources }) => {
      if (id) {
        return dataSources.starWarsAPI.getData({ id });
      }
    },
    starWarsFilm: (_, { id }, { dataSources }) => {
      if (id) {
        return dataSources.starWarsAPI.getData({ id });
      }
    },
    omdbFilm: (_, { title }, { dataSources }) =>
      dataSources.omdbAPI.getData({ title }),
  },
};
