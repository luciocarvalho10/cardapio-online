import { ProductMapper } from '@/entities/product/productMapper';
import { IProduct } from '@/interfaces/IProduct';
import { ProductRepository } from '@/repository/Product';

export const ProductService = {
  async getAll(): Promise<IProduct[]> {
    const dtos = await ProductRepository.getAll();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _entities = ProductMapper.toDomainList(dtos);
    return dtos;
  },

  async create(props: Omit<IProduct, 'id'>): Promise<IProduct> {
    const id = `prod-${Date.now()}`;
    const toCreate: IProduct = { id, ...props };
    const created = await ProductRepository.create(toCreate);
    return created;
  },

  async update(id: string, updates: Partial<IProduct>): Promise<IProduct | null> {
    return ProductRepository.update(id, updates);
  },

  async delete(id: string): Promise<boolean> {
    return ProductRepository.delete(id);
  },

  async toggleAvailability(id: string): Promise<IProduct | null> {
    const current = await ProductRepository.getById(id);
    if (!current) return null;
    return ProductRepository.update(id, { available: !current.available });
  },
};
