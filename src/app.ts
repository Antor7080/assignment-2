import cors from 'cors';
import express from "express";
import { errorHandler } from './helpers/error-handller';
import { UserRouter } from './modules/user';
const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/users", UserRouter);
app.use(errorHandler)
export { app };

