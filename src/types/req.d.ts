import type { Role } from "./enum.ts";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
      };
    }
  }
}

export {}; // <- IMPORTANTE para tratar como módulo TypeScript