const RestAPI = require('./rest-api');
const GraphQLAPI = require('./graphql-api');
const axios = require('axios');

const graphQLTypeDefinitionss =`
type Title {
  title: String
  thumbnail: String
}
type Query {
  getTitles: [Title]
}`;

const graphqlResolvers = {
    Query: { getTitles: async () => (await axios.get(`http://localhost:4095/api/titles`)).data }
};

new RestAPI('../public/videos/desc', '/api/titles', 4095)
new GraphQLAPI(graphQLTypeDefinitionss, graphqlResolvers, 9001)