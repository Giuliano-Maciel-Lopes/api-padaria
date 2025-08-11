import { env } from "@/utils/env.js";

const authConfig = {
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: "1d",
  },
};

export { authConfig };
