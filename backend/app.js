var express = require("express");
var graphqlHTTP = require("express-graphql");
const app = express();
const cors = require("cors");
var mongoose = require("mongoose");
var schema = require('./schema.js').schema;

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
      paintings: async (args) => {
        let result_title = await Painting.find({ title: { "$regex": args.title } }).then(painting => {
          // console.log(painting);
          return painting;

        }).catch(err => {
          console.log(err);
          return 0;

        });
        return result_title;
      },
      test: () => {
        return Painting.find();
      },
      painting: (args) => {

        return Painting.find({ id: args.id }).then(painting => {
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