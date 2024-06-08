import express from "express"
import { signup,login,forgetPassword,resetPassword } from "../controllers/auth.js";
import { gett, google } from "../controllers/users.js";
import {getAllUsers,updateProfile} from "../controllers/users.js"
import auth from "../middlewares/auth.js"

const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)

router.get("/getAllUsers",getAllUsers)
router.patch("/update/:id",auth,updateProfile)
router.post("/forgetPassword", forgetPassword);
router.post("/reset-password/:token", resetPassword);


export default  router;