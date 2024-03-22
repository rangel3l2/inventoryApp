export type Product = {
    id: number | null;
    name: string;
}

export class ProductModel {
    static fromJson(data: Product ): Product {
        return {
            id: data.id || null,
            name: data.name
        }
    }
    static toJson(data: Product): any {
        return {
            id: data.id || null,
            name: data.name
        }
    }
}