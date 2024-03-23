import { Product } from "./products";
import { Item } from "./item";


export type Patrimony = {
 
  codbar: number; // Primary key
  dt_inventario?: string; // Nullable DateTime
  observacao?: string | null; // Nullable String(255)
  responsavel?: string; // Nullable String(255)
  setor_responsavel?: string; // Nullable String(255)
  status: string; // Nullable String(255)
  inventariante_id?: number | null; // Foreign Key to inventariante.id (nullable)
  local_encontrado_id: number; // Foreign Key to local.id (nullable)
  local_id?: number; // Foreign Key to local.id (nullable)
  produto_id?: number | null; // Foreign Key to produto.id (nullable)
  product_id?: Product;
};
export class PatrimonyModel {
  static fromJson(data: Item): Patrimony {
    return {
      
      codbar: data.barcode || 0,
      dt_inventario: data.dateTime,
      observacao: data.observation || "",
      responsavel: data.responsible || "",
      setor_responsavel: data.responsible_sector || "",
      status: data.status,
      inventariante_id: data.user_id || null,
      local_encontrado_id: data.found_place_id,
      local_id: data.place_id,
      produto_id: data.produto_id,
      product_id: data.product_id,
    };
  }
  static toJson(data: Item): any {
    return {
      
      dt_inventario: data.dateTime || "",
      observacao: data.observation || "",
      responsavel: data.responsible || "",
      setor_responsavel: data.responsible_sector || "",
      status: data.status || "",
      inventariante_id: data.user_id ,
      local_encontrado_id: data.found_place_id,
      local_id: data.place_id|| null,
      produto_id: data.produto_id,
      product_id: data.product_id,
    };
  }
  static toJsonCreate(data: Item): any {
    return {
      codbar: data.barcode || null,      
      observacao: data.observation || "",  
      status: data.status || "",
      inventariante_id: data.user_id|| null,
      local_encontrado_id: data.found_place_id || null,  
      name: data.product_id?.name || "",
    };
  }
}
