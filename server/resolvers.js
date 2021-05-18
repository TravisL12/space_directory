const { PEOPLE, VEHICLES, FILMS } = require('./constants');

module.exports = {
  Query: {
    starWarsPeople: (_, { id }, { dataSources }) => {
      if (id) {
        return dataSources.starWarsAPI.getData({ id, type: PEOPLE });
      }
    },
    starWarsVehicle: (_, { id }, { dataSources }) => {
      if (id) {
        return dataSources.starWarsAPI.getData({ id, type: VEHICLES });
      }
    },
    starWarsFilm: (_, { id }, { dataSources }) => {
      if (id) {
        return dataSources.starWarsAPI.getData({ id, type: FILMS });
      }
    },
    omdbFilm: (_, { title }, { dataSources }) =>
      dataSources.omdbAPI.getData({ title }),
  },
};
