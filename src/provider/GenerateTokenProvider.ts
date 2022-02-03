import { sign } from "jsonwebtoken"

class GenerateTokenProvider{

  async execute(userId : string){
    const token = sign({},"974b2615-2c7b-4bdb-9403-67edabf03519",{
      subject : userId,
      expiresIn : "20s"
    })

    return token

  }

}

export { GenerateTokenProvider }
