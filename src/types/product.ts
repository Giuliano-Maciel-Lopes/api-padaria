
export type Product = {
  id:string
  name: string;
  description?: string;
  category: string;
  price: number;
  stock:number
  isActive: boolean
  imageUrl?: string ;
  isVitrine?: boolean;
   createdAt?: string;  
  updatedAt?: string;  
};

