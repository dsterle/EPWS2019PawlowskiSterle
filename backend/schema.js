var { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Visitor {
      transponder: ID!
      borrowed: Boolean!
      history: [String]
    }
    
    type Painting {
      id: ID!
      objectName: String!
      inventarnummer: String!
      title: String!
      link: String!
    }

    type Query {
      visitors: [Visitor!]!
      visitor: Visitor!
      paintings: [Painting!]!
      painting(id: ID!): Painting
    }

    type Mutation {
      putVisitor(transponder: ID!, borrowed: Boolean!, history: [String]): Visitor
    }

    schema {
      query: Query
      mutation: Mutation
    }
`);

exports.schema = schema;