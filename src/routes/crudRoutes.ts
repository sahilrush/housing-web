import { Router } from "express";
import { brokerPost, deletPost, updatePost } from "../controllers/crud";


const crudRouter  = Router()


crudRouter.post('/createPost',brokerPost)
crudRouter.delete('/deletePost',deletPost)
crudRouter.put('/updatePost',updatePost)


export default crudRouter;