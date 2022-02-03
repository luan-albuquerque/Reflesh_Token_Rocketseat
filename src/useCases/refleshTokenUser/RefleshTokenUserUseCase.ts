import dayjs from "dayjs"
import { client } from "../../prisma/client"
import { GenerateRefleshToken } from "../../provider/GenerateRefleshToken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"

class RefleshTokenUserUseCase{

  async execute(reflesh_token : string){

        
    const refleshToken = await client.refleshToken.findFirst({
      where : {
        id : reflesh_token
      }
    })


    

    if(!refleshToken){
      throw new Error("Reflesh token invalid.")
    }

    const refleshTokenExpired = dayjs().isAfter(dayjs.unix(refleshToken.expiresIn))

     
  
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refleshToken.userId)



    if(refleshTokenExpired){

      await client.refleshToken.deleteMany({
        where : {
          userId : refleshToken.userId
        }
      })

      const generateRefleshTokenProvider = new GenerateRefleshToken();
      const newRefleshToken = await generateRefleshTokenProvider.execute(refleshToken.userId);

        
      return { token , newRefleshToken}

    }
  

    return { token }

}


}

export {RefleshTokenUserUseCase }