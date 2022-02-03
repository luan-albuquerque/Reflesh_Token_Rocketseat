
import dayjs from "dayjs"
import { client } from "../prisma/client"

class GenerateRefleshToken{


  async execute(userId : string){
    
       const expiresIn = dayjs().add(60,"second").unix()
       const generateRefleshToken = await client.refleshToken.create({
         data : {
            userId,
            expiresIn
         }
       })
      
       return generateRefleshToken
  }



}

export { GenerateRefleshToken }