export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDto extends Partial<CreateProductDTO> {}

// export interface UpdateProductDto{
//     title ?: string,
//     price ?: number,
//     images ?: string[],
//     description ?: string,
//     categoryId ?: number
// }
