import z from "zod";
export const schemaBodyQuantity = z.object({
    quantity:z.number()
})



export const orderItemIdParamsSchema = z.object({
  orderItemId: z.string().uuid(), // ou cuid() se for cuid()
});