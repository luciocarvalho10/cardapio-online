// interfaces/IRepository.ts

/**
 * Interface genérica para um repositório com operações CRUD (Create, Read, Update, Delete).
 * @template T O tipo de entidade que o repositório gerencia.
 * @template ID O tipo do identificador único da entidade (geralmente string ou number).
 */
export interface IRepository<T extends { id: ID }, ID = string> {
  /**
   * Cria um novo item no repositório.
   * @param item O item a ser criado. O item deve incluir um ID.
   * @returns Uma Promise que resolve com o item criado.
   */
  create(item: T): Promise<T>;

  /**
   * Retorna um item pelo seu identificador único.
   * @param id O ID do item a ser recuperado.
   * @returns Uma Promise que resolve com o item encontrado, ou null se não existir.
   */
  getById(id: ID): Promise<T | null>;

  /**
   * Retorna todos os itens do repositório.
   * @returns Uma Promise que resolve com um array de todos os itens.
   */
  getAll(): Promise<T[]>;

  /**
   * Atualiza um item existente no repositório.
   * @param id O ID do item a ser atualizado.
   * @param updates Um objeto contendo as propriedades a serem atualizadas no item.
   * @returns Uma Promise que resolve com o item atualizado, ou null se o item não for encontrado.
   */
  update(id: ID, updates: Partial<T>): Promise<T | null>;

  /**
   * Deleta um item do repositório pelo seu identificador único.
   * @param id O ID do item a ser deletado.
   * @returns Uma Promise que resolve com true se o item foi deletado com sucesso, ou false caso contrário.
   */
  delete(id: ID): Promise<boolean>;

  /**
   * Opcional: Adiciona um listener para mudanças em tempo real em todos os itens.
   * Útil para o Firebase Realtime Database.
   * @param callback A função a ser chamada sempre que os dados mudarem.
   * @returns Uma função para "desinscrever" o listener.
   */
  listen?(callback: (items: T[]) => void): () => void;
}

