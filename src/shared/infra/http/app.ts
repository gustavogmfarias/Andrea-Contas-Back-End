import "dotenv/config";
import "reflect-metadata";
import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
import createConnection from "@shared/infra/typeorm";
import "@shared/container";

import { router } from "@shared/infra/http/routes";
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";

createConnection();
const app = express();

app.use(express.json());

export { app };
