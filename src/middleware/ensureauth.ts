import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "@/config/auth.js";
import { AppError } from "@/utils/app-error.js";
import { error } from "console";
import { Role } from "@/types/enum..js";

interface TokenPayload {
  role: Role;
  sub: string;
}

function ensureAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("TOKEN nao encontrado", 401);
    }

    const [, token] = authHeader.split(" ");

    const { role, sub: user_id } = jwt.verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    req.user = {
      id: user_id,
      role,
    };

    next();
  } catch (error) {
    throw new AppError("TOKEN INVÁLIDO!!" , 401);
  }
}

export {ensureAuth}