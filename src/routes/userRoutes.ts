import { Router } from "express";
import { signin, signup } from "../controllers/users";


const userRouter = Router()


userRouter.post("signup", signup)
userRouter.post("signin", signin)


export default userRouter;