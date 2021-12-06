const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    // get a single track by id, for the Track page
    // track: (parent, args, context, info) => {},
    // We can replace parent parameter with an underscore.
    // We need id of track so let's destructure it from args parameter.
    // We need access to dataSources key so let's destructure it from context parameter.
    track: (_, { id }, { dataSources }) => {
    // example of getTrackModules call in the track resolver
    // get track details
    // const track = dataSources.trackAPI.getTrack(id);
    // get module details for the track
    // const modules = await dataSources.trackAPI.getTrackModules(id);
    // shape the data in the way that the schema expects it
    // return {...track, modules};
    // however this do unnecessary calls when query don't ask for author data
      return dataSources.trackAPI.getTrack(id);
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
