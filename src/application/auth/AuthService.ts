import { UserRepository } from '@/repository/User';

export const AuthService = {
  // Atenção: Apenas para fins de demonstração. Em produção, delegue autenticação a um backend seguro.
  async login(username: string, password: string): Promise<boolean> {
    const users = await UserRepository.getAll();
    const found = users.find(u => u.name === username && u.password === password);
    return Boolean(found);
  },

  async logout(): Promise<void> {
    // Placeholder para eventual limpeza de sessão/token
    return;
  },
};
