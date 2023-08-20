import express from "express";
import dotenv from "dotenv";
import bodyparser from 'body-parser';
import { errorHandler } from "./utils/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from '../build/swagger.json';

dotenv.config();

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const port = process.env.SERVER_PORT;

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

import { RegisterRoutes } from "../build/routes";
RegisterRoutes(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log( `server started at http://localhost:${port}` );
});
