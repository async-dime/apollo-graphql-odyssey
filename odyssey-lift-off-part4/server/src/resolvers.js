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
      // we need `code`, `success`, and `message` as a response so we async the function call and put it a `track` variable
      const track = await dataSources.trackAPI.incrementTrackViews(id);

      // let's assume it was a successful (200) response, will handle error later
      return {
        code: 200,
        success: true,
        message: `Successfully incremented track ${id}'s number of views`,
        track,
      };
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
