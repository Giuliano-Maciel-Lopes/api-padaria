import z from "zod";

export const updateBodySchemaIsHome = z.object({
    isHome:z.boolean()
})