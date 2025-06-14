import { Role } from "@/enums/roles"; // Enum personalizado

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