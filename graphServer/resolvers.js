module.exports = {
  Query: {
    weather: (_, { zip }, { dataSources }) =>
      dataSources.weatherAPI.getWeather({ zip }),
    starWarsPerson: (_, { id }, { dataSources }) =>
      dataSources.starWarsAPI.getPerson({ id }),
  },
};
