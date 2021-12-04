// const fetch = require('node-fetch');

const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid in the web client's UI
    // We don't need the first two parameters, so as a convention, we'll name them with underscores:
    // one underscore for the first (parent) and two underscores for the second (args).
    // tracksForHome: (parent, args, context, info) => {},
    tracksForHome: (_, __, { dataSources }) => {
      // From our dataSources object, we'll gain access to our trackAPI (lowercase here as it's the instance of our TrackAPI class extending RESTDataSource)
      // and its getTracksforHome method that we built earlier.
      // Our tracksForHome resolver will return the results from that TrackAPI method.
      return dataSources.trackAPI.getTracksForHome();
    },
    // tracksForHomeFetch: async () => {
    //   const baseUrl = 'https://odyssey-lift-off-rest-api.herokuapp.com';
    //   const res = await fetch(`${baseUrl}/tracks`);
    //   return res.json();
    // },
  },
  // Create a resolver function for the Track.author field.
  Track: {
    // author: (parent, args, context, info) => {},
    // We need the parent argument so let's keep it in the resolver function.
    // We can replace args with an underscore.
    // We destructure context to access the dataSources key for our TrackAPI.
    // And then omit info parameter (4th parameter) because we don't need it.
    // We only need authorId so let's to destructure it from parent argument.

    author: ({ authorId }, _, { dataSources }) => {
    // Use the dataSources object to access the trackAPI.getAuthor() method.
    // It takes a authorId argument from the parent and returns the results.
    return dataSources.trackAPI.getAuthor(authorId);
    },

    // using fetch instead of dataSources
    //  author: async ({ authorId }, _, { dataSources }) => {
    //   const baseUrl = 'https://odyssey-lift-off-rest-api.herokuapp.com';
    //   const res = await fetch(`${baseUrl}/author/${authorId}`);
    //   return res.json();
    // },
  },
};

module.exports = resolvers;
