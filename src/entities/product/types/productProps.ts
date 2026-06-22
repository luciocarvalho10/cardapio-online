export type CreateProductProps = {
  name: string;
  description: string;
  price: number;
  image?: string;
  categoryId: string;
  available?: boolean;
  showable?: boolean;
};

export type UpdateProductProps = Partial<CreateProductProps>;

export type ProductPersistence = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  available: boolean;
  showable: boolean;
};
