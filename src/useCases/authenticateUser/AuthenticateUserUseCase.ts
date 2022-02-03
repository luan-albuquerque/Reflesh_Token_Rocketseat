import { client } from "../../prisma/client"
import { compare } from "bcryptjs"

import { GenerateRefleshToken } from "../../provider/GenerateRefleshToken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"

interface IRequest{

   username : string,
   password : string
    
}

class AuthenticateUserUseCase{
    
  async execute({username, password}:IRequest){
        const userAlreadyExists = await client.user.findFirst({
           where : {
             username
           }
        })
    
     if(!userAlreadyExists){
 
        throw new Error("User or Password incorrect")
 
      }
        
     const passwordMatch = await compare(password, userAlreadyExists.password);
       
     if(!passwordMatch){
        throw new Error("User or Password incorrect")    
     }
      const generateTokenProvider = new GenerateTokenProvider();
      const token = await generateTokenProvider.execute(userAlreadyExists.id)
      
      await client.refleshToken.deleteMany({
        where : {
          userId : userAlreadyExists.id
        }
      })

      const generateRefleshToken = new GenerateRefleshToken();
      const refleshToken = await generateRefleshToken.execute(userAlreadyExists.id);


      return { token, refleshToken }
   
    }


   

}

export {AuthenticateUserUseCase}