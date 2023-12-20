import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// The GraphQL schema

// A schema is a collection of type definitions

const typeDefs = `#graphql
# A type defines what fields are queried against the data source. Think of them like Table Schemas or Model definitions
 type Book {
    title: String
    author: String
  },

  type Callsign {
    call: String
    response: String
  },

  type Cookie {
    id: ID!
    toppings: [String]
    ingredients: [String]
    tasty: Boolean
    calories: Float
    quantity: Int
    creator: String
  },

# The Query type lists all queries that can be executed, as well as their return types. Query is reserved.
  type Query {
    books: [Book],
    callsigns: [Callsign],
    cookies: [Cookie],
    doMath: Int!,
    getCookie(id: ID!): Cookie
  },
`;


// We have a hard-coded datasource here, but it's pretty common practice for arrays like these to be pulled from MongoDB
// These datasources can also be from *different* places. We can have a Mongo array, harcoded data, an external API call, etc. all together
const books = [
  {
    title: 'Frankenstein',
    author: 'Mary Shelley',
  },
  {
    title: 'Where the Sidewalk Ends',
    author: 'Shel Silverstein',
  }
]

const callsigns = [
  {
    call: 'flash',
    response: 'thunder'
  },
  {
    call: 'marco',
    response: 'polo'
  }
]

const cookies = [
  {
    id: "1",
    toppings: ['macadamia', 'almond'],
    ingredients: ['whole wheat flour', 'cane sugar'],
    tasty: true,
    calories: 100,
    quantity: 10,
    creator: 'Taylor'
  },
  {
    id: "2",
    toppings: ['chocolate chip'],
    ingredients: ['almond flour', 'stevia'],
    tasty: true,
    calories: 20,
    quantity: 12,
    creator: 'Matt'
  },
  {
    id: "3",
    toppings: ['peppermint'],
    ingredients: [],
    tasty: false,
    calories: 120,
    quantity: 8,
    creator: 'James'
  },
  {
    id: "4",
    toppings: ['Chocolate Kiss'],
    ingredients: ['peanut butter'],
    tasty: true,
    calories: 70,
    quantity: 10,
    creator: 'Tori'
  },
  {
    id: "5",
    toppings: ['bacon'],
    ingredients: ['bacon', 'brown sugar', 'bourbon'],
    tasty: true,
    calories: 140,
    quantity: 5,
    creator: 'Rocky'
  },
  {
    id: "6",
    toppings: ['gold leaf'],
    ingredients: ['so much butter', '( ͡° ͜ʖ ͡°)'],
    tasty: true,
    calories: 420.68,
    quantity: 1,
    creator: 'Joe'
  },
]


// A resolver defines how each of the types deinfied in the schema will be fetched. These are like our SQL statements and ORM Functions
const resolvers = {
  Query: {
    books: () => books,
    callsigns: () => callsigns,
    cookies: () => cookies,
    doMath() {
      return 6 + 7;
    },
    getCookie(parent, args, contextValue, info) {
      return cookies.find((cookie) => cookie.id === args.id);
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);