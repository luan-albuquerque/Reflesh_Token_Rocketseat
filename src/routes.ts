import { request, response, Router } from "express"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { RefleshTokenUserController } from "./useCases/refleshTokenUser/refleshTokenUserController";


const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refleshTokenUserController = new RefleshTokenUserController();

router.post("/users",createUserController.handle);
router.post("/login",authenticateUserController.handle);
router.post("/reflesh-token",refleshTokenUserController.handle);
router.get("/courses", ensureAuthenticated, (request, response) =>{

   return response.json([
     {id:1, name : "Nodejs"},
     {id:2, name : "React"},
     {id:3, name : "ReactNative"}, 
     {id:4, name : "Fluter"} ,
     {id:5, name : "Elixir"} 

   ])
})

export { router }