module.exports = {
  Query: {
    starWarsPeople: (_, { id }, { dataSources }) =>
      dataSources.starWarsAPI.getPeople({ id }),
    starWarsVehicle: (_, { id }, { dataSources }) =>
      dataSources.starWarsAPI.getVehicle({ id }),
    starWarsFilm: (_, { id }, { dataSources }) =>
      dataSources.starWarsAPI.getFilm({ id }),
    omdbFilm: (_, { title }, { dataSources }) =>
      dataSources.omdbAPI.getData({ title }),
  },
  StarWarsPeople: {
    films: ({ films }, _, { dataSources }) =>
      dataSources.starWarsAPI.getFilms({ urls: films }),
    vehicles: ({ vehicles }, _, { dataSources }) =>
      dataSources.starWarsAPI.getVehicles({ urls: vehicles }),
  },
  StarWarsFilm: {
    omdbInfo: ({ title }, _, { dataSources }) =>
      dataSources.omdbAPI.getData({ title }),
  },
};
