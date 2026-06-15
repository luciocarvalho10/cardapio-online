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

import { ICounter } from '@/interfaces/ICounter';
import { IRepository } from '@/interfaces/IRepository'; // Ajuste o caminho

/**
 * Implementação do repositório de contadores para o Firebase Realtime Database.
 */
export class CounterRepository implements IRepository<ICounter, string> {
  private basePath: string; // Caminho base no Realtime Database (ex: "counters")
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
   * Helper para converter um DataSnapshot do Firebase para um array de contadores.
   * @param snapshot O DataSnapshot.
   * @returns Um array de contadores.
   */
  private snapshotToArray(snapshot: DataSnapshot): ICounter[] {
    const counters: ICounter[] = [];
    snapshot.forEach(childSnapshot => {
      const id = childSnapshot.key as string;
      const data = childSnapshot.val();
      if (data) {
        counters.push({ id, ...data });
      }
    });
    return counters;
  }

  // --- Métodos CRUD ---

  async create(item: ICounter): Promise<ICounter> {
    const itemRef = this.getItemRef(item.id);
    await set(itemRef, item);
    return item;
  }

  async getById(id: string): Promise<ICounter | null> {
    const itemRef = this.getItemRef(id);
    const snapshot = await get(itemRef);
    if (snapshot.exists()) {
      return { id, ...snapshot.val() };
    }
    return null;
  }

  async getAll(): Promise<ICounter[]> {
    const collectionRef = ref(this.db, this.basePath);
    const snapshot = await get(collectionRef);
    if (snapshot.exists()) {
      return this.snapshotToArray(snapshot);
    }
    return [];
  }

  async update(
    id: string,
    updates: Partial<ICounter>,
  ): Promise<ICounter | null> {
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
   * Escuta mudanças em tempo real na coleção de contadores.
   * @param callback A função a ser chamada com a lista atualizada de contadores.
   * @returns Uma função para desinscrever o listener.
   */
  listen(callback: (counters: ICounter[]) => void): () => void {
    const collectionRef = ref(this.db, this.basePath);
    const unsubscribe = onValue(collectionRef, snapshot => {
      const counters = this.snapshotToArray(snapshot);
      callback(counters);
    });
    return unsubscribe;
  }
}
