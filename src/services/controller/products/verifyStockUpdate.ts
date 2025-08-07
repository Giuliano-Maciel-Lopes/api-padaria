import { UpdateInput } from "@/schema/products/update.js";

export function verifyStockUpdate(data:UpdateInput ) {
  if (data.stock === 0) {
    return { ...data, isActive: false };
  }else{
   return {...data ,isActive: true }
  }

}
