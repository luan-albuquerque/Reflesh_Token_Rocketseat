import { client } from "../../prisma/client"
import { hash } from "bcryptjs"

interface IUserRequest{
   
  name : string,
  username : string,
  password : string
}

class CreateUserUseCase {


  async execute({name, username, password}: IUserRequest){
    
    // [X] - Verificar se o usario existe
    const userAlreadyExists = await client.user.findFirst({
      where : {
        username
      }
    });

    if(userAlreadyExists){
      throw new Error("user exists")
      // throw new Error("user and password incorrect")
    }
    // [] - Cadastra o Usuario
      const passwordHash = await hash(password, 8);
      const user = client.user.create({
       data : {
        name,
        username,
        password : passwordHash,
       }
     })

     return user;

  }


}

export { 
  CreateUserUseCase
}