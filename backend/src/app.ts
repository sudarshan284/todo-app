import "dotenv/config";

import express, { NextFunction , Request , Response } from "express";
import todoRoutes from "./routes/todo";
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/todo",todoRoutes);

app.use((req,res,next) => {
    next(createHttpError(404,"Endpoint not found"));
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error : unknown, req : Request,res : Response, next:NextFunction) =>{
    console.error(error);
    let statusCode = 500;
    let errorMessage = "This is an unknown error";
    if (isHttpError (error)) {
        statusCode = error.status;
        errorMessage = error.message; 
    }
    res.status(statusCode).json({error : errorMessage});
}
);

export default app;