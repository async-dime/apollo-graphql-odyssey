const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    "Query to get tracks array for homepage grid card"
    tracksForHome: [Track!]!
  }

  "A track is a collection of Modules that represent about a specific topic"
  type Track {
    id: ID!
    "the track's title"
    title: String!
    "the track's main author"
    author: Author!
    "the track's image url that contains image illustration to display in track card or track page detail"
    thumbnail: String
    "the track's approximate duration in minutes"
    length: Int
    "the number of modules this particular track contains"
    modulesCount: Int
  }

  "The Author of a complete track or module"
  type Author {
    id: ID!
    "the author's first and last name"
    name: String!
    "the author's profile photo image url"
    photo: String
  }
`;

module.exports = typeDefs;
