// repositories/ProductRepository
import {
  Database,
  DataSnapshot,
  get,
  onValue,
  ref,
  remove,
  set,
  update} from 'firebase/database';

import { Product } from '@/interfaces/IProduct';
import { IRepository } from '@/interfaces/IRepository'; // Ajuste o caminho

/**
 * Implementação do repositório de produtos para o Firebase Realtime Database.
 */
export class ProductRepository implements IRepository<Product, string> {
  private basePath: string; // Caminho base no Realtime Database (ex: "products")
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
   * @returns Um array de produtos.
   */
  private snapshotToArray(snapshot: DataSnapshot): Product[] {
    const products: Product[] = [];
    snapshot.forEach((childSnapshot) => {
      const id = childSnapshot.key as string;
      const data = childSnapshot.val();
      if (data) {
        products.push({ id, ...data });
      }
    });
    return products;
  }

  // --- Métodos CRUD ---

  async create(item: Product): Promise<Product> {
    const itemRef = this.getItemRef(item.id);
    await set(itemRef, item);
    return item;
  }

  async getById(id: string): Promise<Product | null> {
    const itemRef = this.getItemRef(id);
    const snapshot = await get(itemRef);
    if (snapshot.exists()) {
      return { id, ...snapshot.val() };
    }
    return null;
  }

  async getAll(): Promise<Product[]> {
    const collectionRef = ref(this.db, this.basePath);
    const snapshot = await get(collectionRef);
    if (snapshot.exists()) {
      return this.snapshotToArray(snapshot);
    }
    return [];
  }

  async update(id: string, updates: Partial<Product>): Promise<Product | null> {
    const itemRef = this.getItemRef(id);
    const existingItem = await this.getById(id);

    if (!existingItem) {
      return null; // Item não encontrado para atualização
    }

    await update(itemRef, updates);
    return { ...existingItem, ...updates }; // Retorna o item com as atualizações aplicadas
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
  listen(callback: (products: Product[]) => void): () => void {
    const collectionRef = ref(this.db, this.basePath);
    const unsubscribe = onValue(collectionRef, (snapshot) => {
      const products = this.snapshotToArray(snapshot);
      callback(products);
    });
    return unsubscribe;
  }
}
