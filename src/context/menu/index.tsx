'use client';

import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

import { CategoryService, ProductService, UserService } from '@/application';
import { ICategory } from '@/interfaces/ICategory';
import { ICounter } from '@/interfaces/ICounter';
import { IProduct } from '@/interfaces/IProduct';
import { IUser } from '@/interfaces/IUser';

interface MenuContextType {
  categories: ICategory[];
  products: IProduct[];
  users: IUser[];
  counts: ICounter[];
  isAuthenticated: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addCategory: (category: Omit<ICategory, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<ICategory>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addProduct: (product: Omit<IProduct, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<IProduct>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addUser: (user: Omit<IUser, 'id'>) => Promise<void>;
  updateUser: (id: string, user: Partial<IUser>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

// Valores iniciais vazios; dados serão carregados via services no efeito.

export const MenuContext = createContext<MenuContextType | undefined>(
  undefined,
);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [counts, setCounts] = useState<ICounter[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const computeCounts = useMemo(
    () => (cats: ICategory[], prods: IProduct[], usrs: IUser[]): ICounter[] => [
      { id: 'count-category', name: 'Category', value: cats.length },
      { id: 'count-product', name: 'Product', value: prods.length },
      { id: 'count-user', name: 'User', value: usrs.length },
    ],
    [],
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [cats, prods, usrs] = await Promise.all([
          CategoryService.getAll(),
          ProductService.getAll(),
          UserService.getAll(),
        ]);
        if (!mounted) return;
        setCategories(cats);
        setProducts(prods);
        setUsers(usrs);
        setCounts(computeCounts(cats, prods, usrs));
      } catch (e) {
        // noop (poderia logar/mostrar toast)
      }
    })();
    return () => {
      mounted = false;
    };
  }, [computeCounts]);

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
    const found = users.find(u => u.name === username && u.password === password);
    const ok = Boolean(found);
    setIsAuthenticated(ok);
    return ok;
  };
  //login(users[0].name, users[0].password); // Para facilitar o desenvolvimento, vamos considerar que o login sempre é bem-sucedido

  const logout = () => setIsAuthenticated(false);

  const addCategory = async (cat: Omit<ICategory, 'id'>) => {
    const newCat = await CategoryService.create(cat);
    setCategories(prev => {
      const next = [...prev, newCat].sort((a, b) => a.order - b.order);
      setCounts(computeCounts(next, products, users));
      return next;
    });
  };

  const updateCategory = async (id: string, cat: Partial<ICategory>) => {
    const updatedCat = (await CategoryService.update(id, cat)) ||
      ({ id, ...cat } as ICategory);

    setCategories(prev => {
      const next = prev
        .map(c => (c.id === id ? { ...c, ...updatedCat } : c))
        .sort((a, b) => a.order - b.order);
      setCounts(computeCounts(next, products, users));
      return next;
    });
  };

  const deleteCategory = async (id: string) => {
    const success = await CategoryService.delete(id);
    if (!success) {
      alert('Erro ao deletar categoria. Tente novamente.');
      return;
    }
    setCategories(prevCats => {
      const nextCats = prevCats.filter(c => c.id !== id);
      setProducts(prevProds => {
        const nextProds = prevProds.filter(p => p.categoryId !== id);
        setCounts(computeCounts(nextCats, nextProds, users));
        return nextProds;
      });
      return nextCats;
    });
  };

  const addProduct = async (prod: Omit<IProduct, 'id'>) => {
    const newProd = await ProductService.create(prod);
    setProducts(prev => {
      const next = [...prev, newProd];
      setCounts(computeCounts(categories, next, users));
      return next;
    });
  };

  const updateProduct = async (id: string, prod: Partial<IProduct>) => {
    const updatedProd = (await ProductService.update(id, prod)) ||
      ({ id, ...prod } as IProduct);
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedProd } : p)),
    );
  };

  const deleteProduct = async (id: string) => {
    const success = await ProductService.delete(id);
    if (!success) {
      alert('Erro ao deletar produto. Tente novamente.');
      return;
    }
    setProducts(prev => {
      const next = prev.filter(p => p.id !== id);
      setCounts(computeCounts(categories, next, users));
      return next;
    });
  };

  const addUser = async (user: Omit<IUser, 'id'>) => {
    const newUser = await UserService.create(user);
    setUsers(prev => {
      const next = [...prev, newUser];
      setCounts(computeCounts(categories, products, next));
      return next;
    });
  };

  const updateUser = async (id: string, user: Partial<IUser>) => {
    const updatedUser = (await UserService.update(id, user)) ||
      ({ id, ...user } as IUser);
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, ...updatedUser } : u)),
    );
  };

  const deleteUser = async (id: string) => {
    const success = await UserService.delete(id);
    if (!success) {
      alert('Erro ao deletar usuário. Tente novamente.');
      return;
    }
    setUsers(prev => {
      const next = prev.filter(u => u.id !== id);
      setCounts(computeCounts(categories, products, next));
      return next;
    });
  }

  return (
    <MenuContext.Provider
      value={{
        categories,
        products,
        users,
        counts,
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
      }}>
      {children}
    </MenuContext.Provider>
  );
}
