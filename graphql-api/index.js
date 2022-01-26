const { ApolloServer, gql } = require('apollo-server');

// Some code sampled from https://www.freecodecamp.org/news/get-started-with-graphql-and-nodejs/
class GraphQLAPI {
  server;
  sockets = [];

  constructor(typeDefinitions, resolvers, port = 0) {
    const typeDefs = gql(typeDefinitions);

    this.server = new ApolloServer({ typeDefs, resolvers });

    // this.server.graphqlPath = '/graphql';
    this.server.listen({ port })
      .then(({ url }) => console.log(`Server running at ${url}`));
  }

  /** Terminates all connections and closes the server */
  close() {
    this.server.stop()
  }
}

module.exports = GraphQLAPI