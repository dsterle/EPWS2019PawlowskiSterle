var { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Chip {
      chipnr: ID!
      borrowed: Boolean!
      history: [String]
    }

    type Painting {
      id: String!
      title: String!
      img: [Img]
      dated: Int!
      infos: [Info!]!
    }

    type Img {
      src: String
      description: String
    }

    type Info {
      id: Int!
      name: String!
      inhalt: String!
      audioSrc: String!
    }

    type Query {
      chips: [Chip!]!
      chip: Chip!
      paintings(title: String): [Painting!]!
      painting(id: ID!): Painting
    }

    type Mutation {
      putChip(chipnr: ID!, borrowed: Boolean!, history: [String]): Chip
    }

    schema {
      query: Query
      mutation: Mutation
    }
`);

exports.schema = schema;