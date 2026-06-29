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

import { CategoryEntity } from '@/entities/category/categoryEntity';
import { CategoryMapper } from '@/entities/category/mapper/categoryMapper';
import { ICategory } from '@/interfaces/ICategory';
import { IRepository } from '@/interfaces/IRepository';

export class CategoryRepository implements IRepository<ICategory, string> {
  private basePath: string; // Caminho base no Realtime Database (ex: "categories")
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
   * Helper para converter um DataSnapshot do Firebase para um array de produtos.
   * @param snapshot O DataSnapshot.
   * @returns Um array de categrias.
   */
  private snapshotToArray(snapshot: DataSnapshot): ICategory[] {
    const categories: ICategory[] = [];
    snapshot.forEach(childSnapshot => {
      const id = childSnapshot.key as string;
      const data = childSnapshot.val();
      if (data) {
        categories.push({ id, ...data });
      }
    });
    return categories;
  }

  // --- Métodos CRUD ---

  async create(item: ICategory | CategoryEntity): Promise<ICategory> {
    const persistence: ICategory =
      item instanceof CategoryEntity ? CategoryMapper.toPersistence(item) : item;
    const itemRef = this.getItemRef(persistence.id);
    await set(itemRef, persistence);
    return persistence;
  }

  async getById(id: string): Promise<ICategory | null> {
    const itemRef = this.getItemRef(id);
    const snapshot = await get(itemRef);
    if (snapshot.exists()) {
      return { id, ...snapshot.val() };
    }
    return null;
  }

  async getAll(): Promise<ICategory[]> {
    const collectionRef = ref(this.db, this.basePath);
    const snapshot = await get(collectionRef);
    if (snapshot.exists()) {
      return this.snapshotToArray(snapshot);
    }
    return [];
  }

  async getByIdDomain(id: string): Promise<CategoryEntity | null> {
    const dto = await this.getById(id);
    return dto ? CategoryMapper.toDomain(dto) : null;
  }

  async getAllDomain(): Promise<CategoryEntity[]> {
    const list = await this.getAll();
    return CategoryMapper.toDomainList(list);
  }

  async update(
    id: string,
    updates: Partial<ICategory> | Partial<CategoryEntity>,
  ): Promise<ICategory | null> {
    const itemRef = this.getItemRef(id);
    const existingItem = await this.getById(id);

    if (!existingItem) {
      return null; // Item não encontrado para atualização
    }

    const toPersistence: Partial<ICategory> =
      updates instanceof CategoryEntity
        ? CategoryMapper.toPersistence(updates)
        : (updates as Partial<ICategory>);

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
   * Escuta mudanças em tempo real na coleção de produtos.
   * @param callback A função a ser chamada com a lista atualizada de produtos.
   * @returns Uma função para desinscrever o listener.
   */
  listen(callback: (products: ICategory[]) => void): () => void {
    const collectionRef = ref(this.db, this.basePath);
    const unsubscribe = onValue(collectionRef, snapshot => {
      const products = this.snapshotToArray(snapshot);
      callback(products);
    });
    return unsubscribe;
  }
}
