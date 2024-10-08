
import { Router } from "express";

import {
    uploadPost,
    deletePost,
    updatePost,
    getAllPost,
} from "../controllers/blogsPost.controllers.js";
import { verifyJwt } from "../controllers/users.controllers.js";

const router = Router();


router.route("/uploadPost").post(verifyJwt, uploadPost);
router.route("/getAllPost").get(getAllPost);
router.route("/deletePost/:postId").delete(verifyJwt, deletePost);

router.route("/updatePost/:postId").patch(verifyJwt, updatePost);

export default router;