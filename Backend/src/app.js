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
app.use("/api/blogs/v1/users", userRouter);

// blogs Post Routers
import blogPostRouter from "./routers/blogPost.routers.js";
app.use("/api/blogs/v1/blogsPost", blogPostRouter);

// like routers
import likeRouter from "./routers/likes.routers.js";
app.use("/api/blogs/v1/like", likeRouter)

// Comments Router
import commentPostRouter from "./routers/comments.routers.js";
app.use("/api/blogs/v1/commentPost", commentPostRouter);


// errors handle=>this middleware placed at the last of routes
app.use((err, req, res, next) => {

    res.status(err.statusCode || 500).json({
        message: err.message || "An unknown error occurred",
        statusCode: err.statusCode || 500,
    });
});


export { app };