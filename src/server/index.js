const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const gql = require("graphql-tag");
const { buildASTSchema } = require("graphql");

const ANTS = [
  {
    name: "Marie ‘Ant’oinette",
    length: 12,
    color: "BLACK",
    weight: 2,
  },
  {
    name: "Flamin’ Pincers",
    length: 11,
    color: "RED",
    weight: 2,
  },
  {
    name: "Big Susan",
    length: 20,
    color: "BLACK",
    weight: 5,
  },
  {
    name: "The Unbeareable Lightness of Being",
    length: 5,
    color: "SILVER",
    weight: 1,
  },
  {
    name: "‘The Duke’",
    length: 17,
    color: "RED",
    weight: 3,
  },
];

const schema = buildASTSchema(gql`
  type Query {
    ants: [Ant]
  }

  type Ant {
    name: String
    color: String
    length: Int
    weight: Int
  }
`);

const mapAnts = (ant, name) => ant && { name, ...ant };

const root = {
  ants: () => ANTS.map(mapAnts),
};

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
