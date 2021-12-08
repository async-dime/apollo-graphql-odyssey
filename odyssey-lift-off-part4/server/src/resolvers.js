const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },

    // get a single track by ID, for the track page
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },

    // get a single module by ID, for the module detail page
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id);
    },
  },

  Mutation: {
    // increment a track's numberOfViews property
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      // We've got our successful response for our incrementTrackViews mutation ready.
      // To handle the situation where the TrackAPI call throws an error, let's wrap this section in a try block.
      try {
        // we need `code`, `success`, and `message` as a response so we async the function call and put it a `track` variable
        const track = await dataSources.trackAPI.incrementTrackViews(id);

        // if the track is successfully incremented, return the track
        return {
          code: 200,
          success: true,
          message: `Successfully incremented track ${id}'s number of views`,
          track,
        };
      } catch (error) {
        // We could set the code to be 404, but we can also be more dynamic and use the values that Apollo Server and the RESTDataSource class provide.
        // When an error occurs, Apollo Server attaches an extensions field to that error that contains relevant error details.
        return {
          // our TrackAPI extends RESTDataSource, this extensions object will be enriched with a response property. We can return the status property, which refers to the HTTP status code.
          code: error.extensions.response.status,
          // set our success property to false.
          success: false,
          // message property, we can craft a custom one, but let's use another value from the same extensions.response object. That's the extensions.response.body property.
          message: error.extensions.response.body,
          // the track property of the returned object should exist and be set to null.
          track: null,
        };
      }
    },
  },

  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },

    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id);
    },
  },
};

module.exports = resolvers;
