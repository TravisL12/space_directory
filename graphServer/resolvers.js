module.exports = {
  Query: {
    weather: (_, { zip }, { dataSources }) =>
      dataSources.weatherAPI.getWeather({ zip }),
    person: (_, { id }, { dataSources }) =>
      dataSources.starWarsAPI.getPerson({ id }),
  },
};
