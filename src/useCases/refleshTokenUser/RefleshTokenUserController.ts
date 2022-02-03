import { Request, response, Response } from "express";
import { RefleshTokenUserUseCase } from "./RefleshTokenUserUseCase"

class RefleshTokenUserController{

  async handle(request:Request, response: Response){
     const { reflesh_token } = request.body;
     
     
     const refleshTokenUserUseCase = new RefleshTokenUserUseCase();
     const token = await refleshTokenUserUseCase.execute(reflesh_token);

      response.status(201).json(token)

  }


}

export { RefleshTokenUserController }