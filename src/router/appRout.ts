import express, {Router} from "express";
import { validRegistrValue} from "../validation/bodyValidation";
import {Controller} from "../controller/userController"
import {Auth} from "../middlewares/auth-Middlewares";

const router: Router = express.Router()
const controller = new Controller


router.post('/login', controller.login)
router.post('/registr', validRegistrValue(), controller.registration);
router.post('/logout', controller.logout);
router.get("/activation/:key", controller.activate);
router.get("/refresh",controller.refresh);
router.get("/users",Auth.authorization,controller.getUsers);
router.post("/resetPasswordbyEmail",controller.resetPassword);



export default router;