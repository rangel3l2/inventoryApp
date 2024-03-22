import { Product } from "./products";

export type Item={
        patrimony_id:number | null,
        user_id: number | null,
        barcode?: number | null,
        name: string,      
        status: string,
        observation: string,
        found_place_id: number,
        dateTime?: string,
        product_id?: Product,
        place_id?: number,
        produto_id?: number | null,
        responsible?: string,
        responsible_sector?: string,
        
    
}