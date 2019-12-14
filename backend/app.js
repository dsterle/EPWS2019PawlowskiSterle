var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var app = express();

var schema = require('./schema.js').schema;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: {
    visitors: () => {
      return DB_visitors;
    },
    visitor: (args) => {
      return DB_visitors[0];
    },
    putVisitor: (args) => {
      // TODO store visitor in database

      return args.name;

    },
    paintings: () => {
      return DB_paintings;
    },
    painting: (args) => {
      return DB_paintings.find(painting => painting.id === parseInt(args.id));
    }
  },
  graphiql: true
}));

app.listen(4000);
console.log("Server is running\nPort 4000");