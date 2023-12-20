import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

// The GraphQL schema
const typeDefs = `#graphql
 type Book {
    title: String
    author: String
  }

  type Callsign {
    call: String
    response: String
  }

  type Cookie {
    toppings: String[]
    ingredients: String[]
    tasty: Boolean
    calories: Number
    quantity: Number
    creator: String
  }

  type Query {
    books: [Book]
    callsigns: [Callsign]
    cookies: [Cookie]
  }
`;

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
    toppings: ['macadamia', 'almond'],
    ingredients: ['whole wheat flour', 'cane sugar'],
    tasty: true,
    calories: 100,
    quantity: 10,
    creator: 'Taylor'
  },
  {
    toppings: ['chocolate chip'],
    ingredients: ['almond flour', 'stevia'],
    tasty: true,
    calories: 20,
    quantity: 12,
    creator: 'Matt'
  },
  {
    toppings: ['peppermint'],
    ingredients: [],
    tasty: false,
    calories: 120,
    quantity: 8,
    creator: 'James'
  },
  {
    toppings: ['Chocolate Kiss'],
    ingredients: ['peanut butter'],
    tasty: true,
    calories: 70,
    quantity: 10,
    creator: 'Tori'
  },
  {
    toppings: ['bacon'],
    ingredients: ['bacon', 'brown sugar', 'bourbon'],
    tasty: true,
    calories: 140,
    quantity: 5,
    creator: 'Rocky'
  },
  {
    toppings: ['gold leaf'],
    ingredients: ['so much butter'],
    tasty: true,
    calories: 280,
    quantity: 1,
    creator: 'Joe'
  },
]

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    books: () => books,
    callsigns: () => callsigns,
    cookies: () => cookies
  },
};

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
