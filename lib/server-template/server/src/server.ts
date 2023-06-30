import express, { Application, Request, Response } from 'express';
import http, { Server } from 'http';
import graphqlRouter from './routes/graphql';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from "apollo-server-core";
import jwb from 'jsonwebtoken';
const secretKey = 'your-secret-key'; // Replace with your own secret key

interface MyContext {
    token?: string;
}

const initServer = async (port: number) => {
    const app: Application = express();
    const httpServer = http.createServer(app);

    const typeDefs = `#graphql
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  
    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
      title: String
      author: String
    }

    type Author {
        author: String
    }
  
    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
      books: [Book],
      authors: [Author]
    }


  `;

    const books = [
        {
            title: 'The Awakening',
            author: 'Kate Chopin',
        },
        {
            title: 'City of Glass',
            author: 'Paul Auster',
        },
    ];




    // Resolvers define how to fetch the types defined in your schema.
    // This resolver retrieves books from the "books" array above.
    const resolvers = {
        Query: {
            books: () => books,
            authors: () => books.map(val => val.author)
        }
    };

    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    //@ts-ignore
    const server = new ApolloServer<MyContext>({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    //@ts-ignore
    await server.start();

    // Set up our Express middleware to handle CORS, body parsing,
    // and our expressMiddleware function.
    app.get('/token', (req: Request, res: Response): void => {
        res.send(jwb.sign({
            role: "nothing"
        }, secretKey))
    })
    app.use(
        '/',
        cors<cors.CorsRequest>(),
        bodyParser.json(),
        // expressMiddleware accepts the same arguments:
        // an Apollo Server instance and optional configuration options
        expressMiddleware(server, {
            context: async ({ req, res }) => {
                // Get the user token from the headers.
                let token = req.headers.authorization || '';
                // Try to retrieve a user with the token


                // Add the user to the context
                return jwb.verify(token, secretKey);
            },
        }),
    );



    // Modified server startup
    await new Promise<void>((resolve) => httpServer.listen({ port: port }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/`);





















    // const initServer = (port: number) => {
    //     const app: Application = express();
    //     app.use(cors());
    //     app.use('/api', graphqlRouter);
    //     app.get('/hey', (req, res) => {
    //         res.send("daniela")
    //     })

    //     const server: Server = http.createServer(app);
    //     app.listen(port, () => {
    //         console.log(`Server running on port: ${port}`);
    //     })
    // }





}
export default initServer;
