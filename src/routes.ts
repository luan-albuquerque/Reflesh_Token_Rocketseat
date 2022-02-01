import { request, response, Router } from "express"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";


const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

router.post("/users",createUserController.handle);
router.post("/login",authenticateUserController.handle);
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