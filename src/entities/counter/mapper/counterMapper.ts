import { ICounter } from '@/interfaces/ICounter';

import { CounterEntity } from '../counterEntity';

export class CounterMapper {
  static toDomain(dto: ICounter): CounterEntity {
    return CounterEntity.fromPersistence(dto);
  }

  static toPersistence(entity: CounterEntity): ICounter {
    return {
      id: entity.id,
      name: entity.name,
      value: entity.value,
    };
  }

  static toDomainList(dtos: ICounter[]): CounterEntity[] {
    return dtos.map(CounterMapper.toDomain);
  }

  static toPersistenceList(entities: CounterEntity[]): ICounter[] {
    return entities.map(CounterMapper.toPersistence);
  }
}
