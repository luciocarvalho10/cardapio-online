import { ICounter } from '@/interfaces/ICounter';
import { CategoryRepository } from '@/repository/Category';
import { ProductRepository } from '@/repository/Product';
import { UserRepository } from '@/repository/User';

export const CounterService = {
  async getCounts(): Promise<ICounter[]> {
    const [categories, products, users] = await Promise.all([
      CategoryRepository.getAll(),
      ProductRepository.getAll(),
      UserRepository.getAll(),
    ]);

    return [
      { id: 'count-category', name: 'Category', value: categories.length },
      { id: 'count-product', name: 'Product', value: products.length },
      { id: 'count-user', name: 'User', value: users.length },
    ];
  },
};
