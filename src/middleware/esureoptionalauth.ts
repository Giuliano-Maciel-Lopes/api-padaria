import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "@/config/auth.js";
import { Role } from "@/types/enum.js";

interface TokenPayload {
  role: Role;
  sub: string;
}

function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [, token] = authHeader.split(" ");

    try {
      const { role, sub: user_id } = jwt.verify(
        token,
        authConfig.jwt.secret
      ) as TokenPayload;

      req.user = {
        id: user_id,
        role,
      };
    } catch {
      // token inválido  ignora e segue como não autenticado
      req.user = undefined;
    }
  } else {
    req.user = undefined;
  }

  next();
}

export { optionalAuth };
