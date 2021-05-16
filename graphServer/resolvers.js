const {
  PEOPLE,
  PLANETS,
  VEHICLES,
  STARSHIPS,
  SPECIES,
  FILMS,
} = require('./serverConstants');

module.exports = {
  Query: {
    person: (_, { id }, { dataSources }) =>
      dataSources.starWarsAPI.getData({ id, type: PEOPLE }),
    planets: (_, { id }, { dataSources }) =>
      dataSources.starWarsAPI.getData({ id, type: PLANETS }),
    vehicles: (_, { id }, { dataSources }) =>
      dataSources.starWarsAPI.getData({ id, type: VEHICLES }),
    starships: (_, { id }, { dataSources }) =>
      dataSources.starWarsAPI.getData({ id, type: STARSHIPS }),
    species: (_, { id }, { dataSources }) =>
      dataSources.starWarsAPI.getData({ id, type: SPECIES }),
    films: (_, { id }, { dataSources }) =>
      dataSources.starWarsAPI.getData({ id, type: FILMS }),
  },
};
