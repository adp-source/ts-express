import express from "express";
import dotenv from "dotenv";
import userRouter from "./user/userRouter";
import bodyparser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyparser.json());

const port = process.env.SERVER_PORT; // default port to listen

// define a route handler for the default home page
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send( "Hello world!" );
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );