import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { ICategory } from "@/interfaces/ICategory";
import { IProduct } from "@/interfaces/IProduct";


interface MenuContextType {
  categories: ICategory[];
  products: IProduct[];
  isAuthenticated: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addCategory: (category: Omit<ICategory, "id">) => void;
  updateCategory: (id: string, category: Partial<ICategory>) => void;
  deleteCategory: (id: string) => void;
  addProduct: (product: Omit<IProduct, "id">) => void;
  updateProduct: (id: string, product: Partial<IProduct>) => void;
  deleteProduct: (id: string) => void;
}

const initialCategories: ICategory[] = [
  { id: "cat-1", name: "Entradas", icon: "🥗", order: 1 },
  { id: "cat-2", name: "Pratos Principais", icon: "🍽️", order: 2 },
  { id: "cat-3", name: "Bebidas", icon: "🥤", order: 3 },
  { id: "cat-4", name: "Sobremesas", icon: "🍰", order: 4 },
];

const initialProducts: IProduct[] = [
  {
    id: "prod-1",
    name: "Bruschetta ao Tomate",
    description:
      "Pão italiano tostado com tomate fresco, alho, azeite e manjericão",
    price: 28.9,
    image:
      "https://images.unsplash.com/photo-1761315412580-08dd503b8d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    categoryId: "cat-1",
    available: true,
    showable: true,
  },
  {
    id: "prod-2",
    name: "Calamari Fritto",
    description:
      "Anéis de lula empanados e fritos, servidos com molho aioli e limão",
    price: 42.0,
    image:
      "https://images.unsplash.com/photo-1563245372-169c439d29b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    categoryId: "cat-1",
    available: true,
    showable: true,
  },
  {
    id: "prod-3",
    name: "Filé Mignon ao Molho Madeira",
    description:
      "Filé mignon grelhado ao ponto acompanhado de risoto de cogumelos e molho madeira",
    price: 89.9,
    image:
      "https://images.unsplash.com/photo-1773969423899-01812e1537f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    categoryId: "cat-2",
    available: true,
    showable: true,
  },
  {
    id: "prod-4",
    name: "Salmão Grelhado",
    description:
      "Salmão ao molho de limão siciliano com aspargos e purê de batata trufado",
    price: 79.5,
    image:
      "https://images.unsplash.com/photo-1629723448738-03475a1e536d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    categoryId: "cat-2",
    available: true,
    showable: true,
  },
  {
    id: "prod-5",
    name: "Pasta Carbonara",
    description:
      "Espaguete al dente com pancetta, gema de ovo, parmesão e pimenta-do-reino",
    price: 55.0,
    image:
      "https://images.unsplash.com/photo-1655662844229-d2c2a81f09ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    categoryId: "cat-2",
    available: true,
    showable: true,
  },
  {
    id: "prod-6",
    name: "Coquetel da Casa",
    description:
      "Blend exclusivo com gin, maracujá, limão, xarope de açúcar e espumante",
    price: 32.0,
    image:
      "https://images.unsplash.com/photo-1629993187175-652dcde76778?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    categoryId: "cat-3",
    available: true,
    showable: true,
  },
  {
    id: "prod-7",
    name: "Limonada Suíça",
    description: "Limonada cremosa com leite condensado, limão fresco e menta",
    price: 18.0,
    image:
      "https://images.unsplash.com/photo-1621263764812-ed79919f4e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    categoryId: "cat-3",
    available: true,
    showable: true,
  },
  {
    id: "prod-8",
    name: "Bolo de Chocolate Belga",
    description:
      "Bolo úmido de chocolate belga com ganache e sorvete de baunilha",
    price: 36.0,
    image:
      "https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    categoryId: "cat-4",
    available: true,
    showable: true,
  },
  {
    id: "prod-9",
    name: "Tiramisù Clássico",
    description:
      "Sobremesa italiana com biscoito champagne, creme mascarpone e café espresso",
    price: 34.0,
    image:
      "https://images.unsplash.com/photo-1710106519622-8c49d0bcff2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    categoryId: "cat-4",
    available: true,
    showable: true,
  },
];

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<ICategory[]>(initialCategories);
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const login = (username: string, password: string): boolean => {
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  const addCategory = (cat: Omit<ICategory, "id">) => {
    const newCat: ICategory = { ...cat, id: `cat-${Date.now()}` };
    setCategories((prev) =>
      [...prev, newCat].sort((a, b) => a.order - b.order),
    );
  };

  const updateCategory = (id: string, cat: Partial<ICategory>) => {
    setCategories((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, ...cat } : c))
        .sort((a, b) => a.order - b.order),
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setProducts((prev) => prev.filter((p) => p.categoryId !== id));
  };

  const addProduct = (prod: Omit<IProduct, "id">) => {
    const newProd: IProduct = { ...prod, id: `prod-${Date.now()}` };
    setProducts((prev) => [...prev, newProd]);
  };

  const updateProduct = (id: string, prod: Partial<IProduct>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...prod } : p)),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <MenuContext.Provider
      value={{
        categories,
        products,
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
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

