var express = require("express");
var graphqlHTTP = require("express-graphql");
var app = express();

var schema = require('./schema.js').schema;
const DB_paintings = require("./data/database").paintings;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: {
    chips: () => {
      // return DB_visitors;
    },
    chip: (args) => {
      // return DB_paintings.find(painting => painting.id === parseInt(args.id));
    },
    putchip: (args) => {
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