
import { Router } from "express";
import {
    registerUsers, loginUser, verifyJwt,
    changePassword, logoutUser, checkUserLogin,
    updateAvatar, deleteAvatar, getYourAllPost
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

// check Already Login or not
router.route("/checkUserLogin").get(verifyJwt, checkUserLogin);
router.route("/updateAvatar").patch(verifyJwt, upload.single('avatar'), updateAvatar);


// delete images from cloudinary
router.route("/deleteAvatar").delete(verifyJwt, deleteAvatar);

// get your all Posts
router.route("/getYourAllPost").get(verifyJwt, getYourAllPost);
export default router;