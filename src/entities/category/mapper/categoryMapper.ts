import { ICategory } from '@/interfaces/ICategory';

import { CategoryEntity } from '../categoryEntity';

export class CategoryMapper {
  static toDomain(dto: ICategory): CategoryEntity {
    return CategoryEntity.fromPersistence({ ...dto });
  }

  static toPersistence(entity: CategoryEntity): ICategory {
    return {
      id: entity.id,
      name: entity.name,
      icon: entity.icon,
      order: entity.order,
    };
  }

  static toDomainList(dtos: ICategory[]): CategoryEntity[] {
    return dtos.map(dto => CategoryMapper.toDomain(dto));
  }

  static toPersistenceList(entities: CategoryEntity[]): ICategory[] {
    return entities.map(entity => CategoryMapper.toPersistence(entity));
  }
}
