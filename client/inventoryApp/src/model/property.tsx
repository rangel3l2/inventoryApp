import { Item } from "./item";


export type Property = {   
    observation?: string | null; // Nullable String(255)   
    status?: string; // Nullable String(255)
    inventariante_id?: number | null; // Foreign Key to inventariante.id (nullable)
    place_id: number | null; // Foreign Key to local.id (nullable)  
    product_name: string;
    dh_inventory:string| null,
}

export class PropertyModel {
   static toJsonCreate(data: Item): Property {
        return {
            
            observation: data.observation || "",            
            inventariante_id: data.user_id || null,
            place_id: data.found_place_id || null,           
            product_name: data.product_id?.name || "",
            dh_inventory: "",
        };
    }
}