import { ICategory } from '../../../interfaces/ICategory';

export type CreateCategoryProps = {
  name: string;
  icon: string;
  order: number;
};

export type UpdateCategoryProps = Partial<CreateCategoryProps>;

export type CategoryPersistence = ICategory;
