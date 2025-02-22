import { Router } from "express";
import { brokerPost, deletPost, updatePost } from "../controllers/crud";
import { adminMiddleware } from "../middleware/adminMiddleware";


const crudRouter  = Router()


crudRouter.post('/createPost',adminMiddleware,  brokerPost)
crudRouter.delete('/deletePost',adminMiddleware,deletPost)
crudRouter.put('/updatePost',adminMiddleware, updatePost)


export default crudRouter;