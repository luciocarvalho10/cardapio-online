import { UserMapper } from '@/entities/user/mapper/userMapper';
import { IUser } from '@/interfaces/IUser';
import { UserRepository } from '@/repository/User';

export const UserService = {
  async getAll(): Promise<IUser[]> {
    const dtos = await UserRepository.getAll();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _entities = UserMapper.toDomainList(dtos);
    return dtos;
  },

  async create(props: Omit<IUser, 'id'>): Promise<IUser> {
    const id = `user-${Date.now()}`;
    const toCreate: IUser = { id, ...props };
    return UserRepository.create(toCreate);
  },

  async update(id: string, updates: Partial<IUser>): Promise<IUser | null> {
    return UserRepository.update(id, updates);
  },

  async delete(id: string): Promise<boolean> {
    return UserRepository.delete(id);
  },
};
