import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { errorMiddleware } from "./common/middleware/error.middleware";

import v1Routes from "./routes/v1";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/uploads" , express.static("uploads"));
app.use(errorMiddleware);

app.use("/api/v1" , v1Routes);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

export default app;
