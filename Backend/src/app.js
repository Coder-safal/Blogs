import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public")); //store on own server

app.use(cookieParser());


// Users Router
import userRouter from "./routers/users.routers.js";
app.use("/api/v1/users", userRouter);




export { app };