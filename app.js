import express, { request, response } from "express";
import routes from "./routes/users.routes.js";
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

const accessLogStream = fs.createWriteStream(path.resolve("access.log"), {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.json());
app.use("/api/v1", routes);

app.use(errorHandler);

export default app;