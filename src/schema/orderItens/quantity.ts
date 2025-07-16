import z from "zod";
export const schemaBodyQuantity = z.object({
    quantity:z.number()
})



export const orderItemIdParamsSchema = z.object({
  id: z.string().uuid(), 
});