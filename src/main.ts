import express from "express";
import { PORT } from "./utils/env-utils";
import { apiRouter } from "./route/api-router";
import { errorMiddleware } from "./middleware/error-middleware";

const app = express()

app.use(express.json())
app.use("/api", apiRouter)
app.use(errorMiddleware)

app.listen(PORT || 3000, () => {
    console.log(`Connected to port ${PORT}`);
})