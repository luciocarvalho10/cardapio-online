import { IUser } from '@/interfaces/IUser';

import { UserEntity } from '../userEntity';

export class UserMapper {
  static toDomain(dto: IUser): UserEntity {
    return UserEntity.fromPersistence({ ...dto });
  }

  static toPersistence(entity: UserEntity): IUser {
    return {
      id: entity.id,
      name: entity.name,
      password: entity.password,
      role: entity.role,
    };
  }

  static toDomainList(dtos: IUser[]): UserEntity[] {
    return dtos.map(dto => UserMapper.toDomain(dto));
  }

  static toPersistenceList(entities: UserEntity[]): IUser[] {
    return entities.map(entity => UserMapper.toPersistence(entity));
  }
}
