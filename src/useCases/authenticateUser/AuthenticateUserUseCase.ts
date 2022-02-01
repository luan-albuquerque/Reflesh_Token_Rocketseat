import { client } from "../../prisma/client"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

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

      const token = sign({},"974b2615-2c7b-4bdb-9403-67edabf03519",{
        subject : userAlreadyExists.id,
        expiresIn : "20s"
      })


      return { token }
   
    }


   

}

export {AuthenticateUserUseCase}