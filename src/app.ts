import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors";
import * as helmet from "koa-helmet";
import * as json from "koa-json";
import * as logger from "koa-logger";
import * as yamljs from "yamljs";
import { koaSwagger } from 'koa2-swagger-ui';
require('dotenv').config()

import "accepts";

import router from "./server";
import dbConnect from "./database/initDatabase";

const app = new Koa();
const port = process.env.PORT || 4000;

const spec = yamljs.load("./src/openapi.yaml");

app
.use(helmet())
.use(cors())
.use(json())
.use(logger())
.use(bodyParser())

router.get("/swagger", koaSwagger({ routePrefix: false, swaggerOptions: { spec } }))

app.use(router.routes()).use(router.allowedMethods());
dbConnect();

app.listen(port, () => {
  console.log(`🚀 App listening on the port ${port}`);
});
