export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  available: boolean;
  showable: boolean;
}
