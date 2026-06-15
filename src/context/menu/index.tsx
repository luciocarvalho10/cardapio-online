'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

import { ICategory } from '@/interfaces/ICategory';
import { ICounter } from '@/interfaces/ICounter';
import { IProduct } from '@/interfaces/IProduct';
import { IUser } from '@/interfaces/IUser';
import { CategoryRepository } from '@/repository/Category';
import { CounterRepository } from '@/repository/Counter';
import { ProductRepository } from '@/repository/Product';
import { UserRepository } from '@/repository/User';

interface MenuContextType {
  categories: ICategory[];
  products: IProduct[];
  users: IUser[];
  isAuthenticated: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addCategory: (category: Omit<ICategory, 'id'>) => void;
  updateCategory: (id: string, category: Partial<ICategory>) => void;
  deleteCategory: (id: string) => void;
  addProduct: (product: Omit<IProduct, 'id'>) => void;
  updateProduct: (id: string, product: Partial<IProduct>) => void;
  deleteProduct: (id: string) => void;
  addUser: (user: Omit<IUser, 'id'>) => void;
  updateUser: (id: string, user: Partial<IUser>) => void;
  deleteUser: (id: string) => void;
  ProductRepository: typeof ProductRepository;
  CategoryRepository: typeof CategoryRepository;
  UserRepository: typeof UserRepository;
}

const initialCounters = await CounterRepository.getAll().then((counters: ICounter[]) =>
  counters.length > 0
    ? counters
    : [
        { id: 'count-1', name: 'Category', value: 4 },
        { id: 'count-2', name: 'Product', value: 9 },
        { id: 'count-3', name: 'User', value: 1 },
      ],
);

const initialCategories = await CategoryRepository.getAll().then((cats: ICategory[]) =>
  cats.length > 0
    ? cats
    : [
        { id: 'cat-1', name: 'Entradas', icon: '🥗', order: 1 },
        { id: 'cat-2', name: 'Pratos Principais', icon: '🍽️', order: 2 },
        { id: 'cat-3', name: 'Bebidas', icon: '🥤', order: 3 },
        { id: 'cat-4', name: 'Sobremesas', icon: '🍰', order: 4 },
      ],
);

const initialProducts = await ProductRepository.getAll().then((prods: IProduct[]) =>
  prods.length > 0
    ? prods
    : [
        {
          id: 'prod-1',
          name: 'Bruschetta ao Tomate',
          description:
            'Pão italiano tostado com tomate fresco, alho, azeite e manjericão',
          price: 28.9,
          image:
            'https://images.unsplash.com/photo-1761315412580-08dd503b8d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
          categoryId: 'cat-1',
          available: true,
          showable: true,
        },
        {
          id: 'prod-2',
          name: 'Calamari Fritto',
          description:
            'Anéis de lula empanados e fritos, servidos com molho aioli e limão',
          price: 42.0,
          image:
            'https://images.unsplash.com/photo-1563245372-169c439d29b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
          categoryId: 'cat-1',
          available: true,
          showable: true,
        },
        {
          id: 'prod-3',
          name: 'Filé Mignon ao Molho Madeira',
          description:
            'Filé mignon grelhado ao ponto acompanhado de risoto de cogumelos e molho madeira',
          price: 89.9,
          image:
            'https://images.unsplash.com/photo-1773969423899-01812e1537f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
          categoryId: 'cat-2',
          available: true,
          showable: true,
        },
        {
          id: 'prod-4',
          name: 'Salmão Grelhado',
          description:
            'Salmão ao molho de limão siciliano com aspargos e purê de batata trufado',
          price: 79.5,
          image:
            'https://images.unsplash.com/photo-1629723448738-03475a1e536d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
          categoryId: 'cat-2',
          available: true,
          showable: true,
        },
        {
          id: 'prod-5',
          name: 'Pasta Carbonara',
          description:
            'Espaguete al dente com pancetta, gema de ovo, parmesão e pimenta-do-reino',
          price: 55.0,
          image:
            'https://images.unsplash.com/photo-1655662844229-d2c2a81f09ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
          categoryId: 'cat-2',
          available: true,
          showable: true,
        },
        {
          id: 'prod-6',
          name: 'Coquetel da Casa',
          description:
            'Blend exclusivo com gin, maracujá, limão, xarope de açúcar e espumante',
          price: 32.0,
          image:
            'https://images.unsplash.com/photo-1629993187175-652dcde76778?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
          categoryId: 'cat-3',
          available: true,
          showable: true,
        },
        {
          id: 'prod-7',
          name: 'Limonada Suíça',
          description:
            'Limonada cremosa com leite condensado, limão fresco e menta',
          price: 18.0,
          image:
            'https://images.unsplash.com/photo-1621263764812-ed79919f4e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
          categoryId: 'cat-3',
          available: true,
          showable: true,
        },
        {
          id: 'prod-8',
          name: 'Bolo de Chocolate Belga',
          description:
            'Bolo úmido de chocolate belga com ganache e sorvete de baunilha',
          price: 36.0,
          image:
            'https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
          categoryId: 'cat-4',
          available: true,
          showable: true,
        },
        {
          id: 'prod-9',
          name: 'Tiramisù Clássico',
          description:
            'Sobremesa italiana com biscoito champagne, creme mascarpone e café espresso',
          price: 34.0,
          image:
            'https://images.unsplash.com/photo-1710106519622-8c49d0bcff2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
          categoryId: 'cat-4',
          available: true,
          showable: true,
        },
      ],
);

const initialUsers = await UserRepository.getAll().then((users: IUser[]) =>
  users.length > 0
    ? users
    : [{ id: 'user-1', name: '1', password: '1', role: 'admin' }],
);

export const MenuContext = createContext<MenuContextType | undefined>(
  undefined,
);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<ICategory[]>(initialCategories);
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [users, setUsers] = useState<IUser[]>(initialUsers);
  const [counters, setCounters] = useState<ICounter[]>(initialCounters);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Carregar valor salvo do localStorage na montagem do cliente
    if (typeof window !== 'undefined') {
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      setIsDarkMode(savedDarkMode);
    }
  }, []);

  useEffect(() => {
    // Atualizar classe do DOM e salvar no localStorage
    if (typeof window !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', String(isDarkMode));
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const login = (username: string, password: string): boolean => {
    if (username === users[0].name && password === users[0].password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };
  //login(users[0].name, users[0].password); // Para facilitar o desenvolvimento, vamos considerar que o login sempre é bem-sucedido

  const logout = () => setIsAuthenticated(false);

  const addCategory = async (cat: Omit<ICategory, 'id'>) => {
    const id = `cat-${counters[0].value + 1}`;
    // const newCat: ICategory = { ...cat, id: `cat-${Date.now()}` };
    const newCat: ICategory = await CategoryRepository.create({ ...cat, id });
    setCategories(prev => [...prev, newCat].sort((a, b) => a.order - b.order));

    setCounters(prev => [...prev, {...prev[0], value: prev[0].value + 1}]);
    await CounterRepository.update(counters[0].id, counters[0])
  };

  const updateCategory = async (id: string, cat: Partial<ICategory>) => {
    const updatedCat =
      (await CategoryRepository.update(id, cat)) ||
      ({ id, ...cat } as ICategory);

    setCategories(prev =>
      prev
        // .map(c => (c.id === id ? { ...c, ...cat } : c))
        .map(c => (c.id === id ? { ...c, ...updatedCat } : c))
        .sort((a, b) => a.order - b.order),
    );
  };

  const deleteCategory = async (id: string) => {
    const success = CategoryRepository.delete(id);
    if (!success) {
      alert('Erro ao deletar categoria. Tente novamente.');
      return;
    }
    setCategories(prev => prev.filter(c => c.id !== id));
    setProducts(prev => prev.filter(p => p.categoryId !== id));
    setCounters(prev => [
      ...prev,
      { ...prev[0], value: prev[0].value - 1 },
      { ...prev[1], value: prev[1].value - 1 },
    ]);
    await CounterRepository.update(counters[0].id, counters[0]);
    await CounterRepository.update(counters[1].id, counters[1]);
  };

  const addProduct = async (prod: Omit<IProduct, 'id'>) => {
    const id = `prod-${counters[1].value + 1}`;
    // const newProd: IProduct = { ...prod, id: `prod-${Date.now()}` };
    const newProd: IProduct = await ProductRepository.create({ ...prod, id });
    setProducts(prev => [...prev, newProd]);
    setCounters(prev => [...prev, {...prev[1], value: prev[1].value + 1}]);
    await CounterRepository.update(counters[1].id, counters[1])
  };

  const updateProduct = async (id: string, prod: Partial<IProduct>) => {
    const updatedProd =
      (await ProductRepository.update(id, prod)) ||
      ({ id, ...prod } as IProduct);
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedProd } : p)),
    );
  };

  const deleteProduct = async (id: string) => {
    const success = ProductRepository.delete(id);
    if (!success) {
      alert('Erro ao deletar produto. Tente novamente.');
      return;
    }
    setProducts(prev => prev.filter(p => p.id !== id));
    setCounters(prev => [
      ...prev,
      { ...prev[1], value: prev[1].value - 1 },
    ]);
    await CounterRepository.update(counters[1].id, counters[1]);
  };

  const addUser = async (user: Omit<IUser, 'id'>) => {
    const id = `user-${counters[2].value + 1}`;
    const newUser: IUser = await UserRepository.create({ ...user, id });
    setUsers(prev => [...prev, newUser]);
    setCounters(prev => [...prev, {...prev[2], value: prev[2].value + 1}]);
    await CounterRepository.update(counters[2].id, counters[2]);
  };

  const updateUser = async (id: string, user: Partial<IUser>) => {
    const updatedUser =
      (await UserRepository.update(id, user)) ||
      ({ id, ...user } as IUser);
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, ...updatedUser } : u)),
    );
  };

  const deleteUser = async (id: string) => {
    const success = UserRepository.delete(id);
    if (!success) {
      alert('Erro ao deletar usuário. Tente novamente.');
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== id));
    setCounters(prev => [
      ...prev,
      { ...prev[2], value: prev[2].value - 1 },
    ]);
    await CounterRepository.update(counters[2].id, counters[2]);
  }

  return (
    <MenuContext.Provider
      value={{
        categories,
        products,
        users,
        isAuthenticated,
        isDarkMode,
        toggleDarkMode,
        login,
        logout,
        addCategory,
        updateCategory,
        deleteCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        addUser,
        updateUser,
        deleteUser,
        ProductRepository,
        CategoryRepository,
        UserRepository,
      }}>
      {children}
    </MenuContext.Provider>
  );
}
