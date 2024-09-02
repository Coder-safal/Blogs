
import { Router } from "express";
import {
    registerUsers, loginUser, verifyJwt,
    changePassword, logoutUser,
} from "../controllers/users.controllers.js"
import { upload } from "../middlewares/multer.js";

const router = Router();



// router.route("/register").post(registerUser)

router.route("/register").post(upload.single('avatar'), registerUsers);

// loginUser
router.route("/login").post(loginUser);

// change password
router.route("/changePassword").patch(verifyJwt, changePassword);


// LogoutUser
router.route("/logout").get(verifyJwt, logoutUser);

export default router;