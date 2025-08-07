import z from "zod";

export const bodySchemaUpdateACtive = z.object({
    isActive:z.boolean()
})