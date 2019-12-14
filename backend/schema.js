var { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Chip {
      chipnr: ID!
      borrowed: Boolean!
      history: [String]
    }

    type Painting {
      id: ID!
      objectName: String!
      inventarnummer: String!
      title: String!
      link: String!
      imgSrc: [String!]!
      dated: Int!
      infos: [Info!]!
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
      paintings: [Painting!]!
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