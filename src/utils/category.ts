import { z } from "zod";

export const allowedCategories = [
  "achocolatados",
  "bebidas",
  "bolos-e-tortas",
  "combos",
  "doces",
  "paes",
  "queijos",
  "salgados",
  "sanduiches",
] as const;

export const schemaCategory = z.enum(allowedCategories);
