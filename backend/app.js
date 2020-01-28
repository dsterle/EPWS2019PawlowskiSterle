var express = require("express");
var graphqlHTTP = require("express-graphql");
const app = express();
const cors = require("cors");
var mongoose = require("mongoose");

var schema = require('./schema.js').schema;
const DB_paintings = require("./data/database").paintings;

//** Models */
const Painting = require("./models/painting");

const startServer = async () => {

  app.use(cors());

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
        // return args.name;

      },
      paintings: () => {
        return DB_paintings;
      },
      test: () => {
        return Painting.find();
      },
      painting: (args) => {

        // const painting = new Painting({
        //   id: 10,
        //   title: "Test Painting"
        // });
        // painting.save().then().catch(err => console.log(err));

        return Painting.find({ id: args.id }).then(painting => {
          console.log(painting[0]);
          return painting[0];

        }).catch(err => {

          console.log(err);
          return 0;

        });
      }
    },
    graphiql: true
  }));


  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect("mongodb+srv://clientUser:zY5IxxysJgzWScxq@inguidecluster-cuy5l.mongodb.net/inGuideDatabase?retryWrites=true&w=majority&authSource=admin", { useNewUrlParser: true });
  } catch (err) {
    console.log("\n\nError occured:");
    console.log(err);
    console.log("\n\n");
  }

  app.listen(4000);
  console.log("Server is running\nPort 4000");
}

startServer();