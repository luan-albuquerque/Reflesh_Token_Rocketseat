import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  const authToken = request.headers.authorization
  if (!authToken) {
    return response.status(401).json({
      message: "Token in missing"
    })
  }

  const [, token] = authToken.split(" ")

  try {

    verify(token, "974b2615-2c7b-4bdb-9403-67edabf03519")
    return next();

  } catch (error) {

    return response.status(401).json({
      message: "Token Invalid"
    })
  }

  return { token }

}