
import { verifyJwt } from "../controllers/users.controllers.js"

import {
    deletePostComment,
    postComment,
    getPostComment,
    countpostComments,
} from "../controllers/comments.controllers.js";

import { Router } from "express";

const router = Router();

router.route("/postComment/:postId").post(verifyJwt, postComment)
router.route("/getPostComment/:postId").get(getPostComment);
router.route("/countpostComments/:postId").get(countpostComments);



export default router;