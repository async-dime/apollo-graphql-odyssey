const { RESTDataSource } = require('apollo-datasource-rest');

class TrackAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/';
  }

  getTracksForHome() {
    // GET request to the tracks endpoint
    return this.get('tracks');
  }

  getAuthor(authorId) {
    // GET call to the /author/:id endpoint
    return this.get(`author/${authorId}`);
  }
}

module.exports = TrackAPI;
