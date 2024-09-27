import { Router } from "express";

import {
    tooglePostLike,
    toogleCommentLike,
    countPostLike,
    countCommentLike,
} from "../controllers/likes.controllers.js";

import { verifyJwt } from "../controllers/users.controllers.js";

const router = Router();


router.route("/tooglePostLike/:PostId").post(verifyJwt, tooglePostLike);
router.route("/countPostLike/:postId").get(verifyJwt, countPostLike);

export default router;