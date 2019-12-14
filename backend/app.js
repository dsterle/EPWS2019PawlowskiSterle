var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var app = express();

app.listen(4000);

console.log("Server is running\nPort 4000");