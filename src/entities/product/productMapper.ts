import { IProduct } from '@/interfaces/IProduct';

import { ProductEntity } from './productEntity';

export class ProductMapper {
  static toDomain(dto: IProduct): ProductEntity {
    return ProductEntity.fromPersistence({ ...dto });
  }

  static toPersistence(entity: ProductEntity): IProduct {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      image: entity.image,
      categoryId: entity.categoryId,
      available: entity.available,
      showable: entity.showable,
    };
  }

  static toDomainList(dtos: IProduct[]): ProductEntity[] {
    return dtos.map(dto => ProductMapper.toDomain(dto));
  }

  static toPersistenceList(entities: ProductEntity[]): IProduct[] {
    return entities.map(entity => ProductMapper.toPersistence(entity));
  }
}
