import {
  Database,
  DataSnapshot,
  get,
  onValue,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';

import { UserMapper } from '@/entities/user/mapper/userMapper';
import { UserEntity } from '@/entities/user/userEntity';
import { IRepository } from '@/interfaces/IRepository'; // Ajuste o caminho
import { IUser } from '@/interfaces/IUser';

/**
 * Implementação do repositório de usuários para o Firebase Realtime Database.
 */
export class UserRepository implements IRepository<IUser, string> {
  private basePath: string; // Caminho base no Realtime Database (ex: "users")
  private db: Database; // Instância do Realtime Database

  constructor(db: Database, basePath: string) {
    this.db = db;
    this.basePath = basePath;
  }

  /**
   * Helper para obter uma referência de um item específico.
   * @param id O ID do item.
   * @returns A referência do Firebase Database para o item.
   */
  private getItemRef(id: string) {
    return ref(this.db, `${this.basePath}/${id}`);
  }

  /**
   * Helper para converter um DataSnapshot do Firebase para um array de usuários.
   * @param snapshot O DataSnapshot.
   * @returns Um array de usuários.
   */
  private snapshotToArray(snapshot: DataSnapshot): IUser[] {
    const users: IUser[] = [];
    snapshot.forEach(childSnapshot => {
      const id = childSnapshot.key as string;
      const data = childSnapshot.val();
      if (data) {
        users.push({ id, ...data });
      }
    });
    return users;
  }

  // --- Métodos CRUD ---

  async create(item: IUser | UserEntity): Promise<IUser> {
    const persistence: IUser =
      item instanceof UserEntity ? UserMapper.toPersistence(item) : item;
    const itemRef = this.getItemRef(persistence.id);
    await set(itemRef, persistence);
    return persistence;
  }

  async getById(id: string): Promise<IUser | null> {
    const itemRef = this.getItemRef(id);
    const snapshot = await get(itemRef);
    if (snapshot.exists()) {
      return { id, ...snapshot.val() };
    }
    return null;
  }

  async getAll(): Promise<IUser[]> {
    const collectionRef = ref(this.db, this.basePath);
    const snapshot = await get(collectionRef);
    if (snapshot.exists()) {
      return this.snapshotToArray(snapshot);
    }
    return [];
  }

  async getByIdDomain(id: string): Promise<UserEntity | null> {
    const dto = await this.getById(id);
    return dto ? UserMapper.toDomain(dto) : null;
  }

  async getAllDomain(): Promise<UserEntity[]> {
    const list = await this.getAll();
    return UserMapper.toDomainList(list);
  }

  async update(
    id: string,
    updates: Partial<IUser> | Partial<UserEntity>,
  ): Promise<IUser | null> {
    const itemRef = this.getItemRef(id);
    const existingItem = await this.getById(id);

    if (!existingItem) {
      return null; // Item não encontrado para atualização
    }

    const toPersistence: Partial<IUser> =
      updates instanceof UserEntity
        ? UserMapper.toPersistence(updates)
        : (updates as Partial<IUser>);

    await update(itemRef, toPersistence);
    return { ...existingItem, ...toPersistence }; // Retorna o item com as atualizações aplicadas
  }

  async delete(id: string): Promise<boolean> {
    const itemRef = this.getItemRef(id);
    const existingItem = await this.getById(id);

    if (!existingItem) {
      return false; // Item não encontrado para deletar
    }

    await remove(itemRef);
    return true;
  }

  /**
   * Escuta mudanças em tempo real na coleção de usuários.
   * @param callback A função a ser chamada com a lista atualizada de usuários.
   * @returns Uma função para desinscrever o listener.
   */
  listen(callback: (users: IUser[]) => void): () => void {
    const collectionRef = ref(this.db, this.basePath);
    const unsubscribe = onValue(collectionRef, snapshot => {
      const users = this.snapshotToArray(snapshot);
      callback(users);
    });
    return unsubscribe;
  }
}
