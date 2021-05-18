module.exports = {
  Query: {
    starWarsPeople: (_, { id }, { dataSources }) => {
      if (id) {
        return dataSources.starWarsAPI.getPeople({ id });
      }
    },
    starWarsVehicle: (_, { id }, { dataSources }) => {
      if (id) {
        return dataSources.starWarsAPI.getVehicle({ id });
      }
    },
    starWarsFilm: (_, { id }, { dataSources }) => {
      if (id) {
        return dataSources.starWarsAPI.getFilm({ id });
      }
    },
    omdbFilm: (_, { title }, { dataSources }) =>
      dataSources.omdbAPI.getData({ title }),
  },
};
