import { CategoryMapper } from '@/entities/category/mapper/categoryMapper';
import { ICategory } from '@/interfaces/ICategory';
import { CategoryRepository } from '@/repository/Category';

export const CategoryService = {
  async getAll(): Promise<ICategory[]> {
    const dtos = await CategoryRepository.getAll();
    // Mantém mapeamento disponível para evolução ao domínio
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _entities = CategoryMapper.toDomainList(dtos);
    // UI atual consome DTO diretamente
    return [...dtos].sort((a, b) => a.order - b.order);
  },

  async create(props: Omit<ICategory, 'id'>): Promise<ICategory> {
    const id = `cat-${Date.now()}`;
    const toCreate: ICategory = { id, ...props };
    const created = await CategoryRepository.create(toCreate);
    // Opcional: CategoryMapper.toDomain(created)
    return created;
  },

  async update(id: string, updates: Partial<ICategory>): Promise<ICategory | null> {
    const updated = await CategoryRepository.update(id, updates);
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    return CategoryRepository.delete(id);
  },

  async changePosition(id: string, newOrder: number): Promise<ICategory | null> {
    return CategoryRepository.update(id, { order: newOrder });
  },
};
