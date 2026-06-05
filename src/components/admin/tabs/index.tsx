import IC from "../../icons";
import { SetStateAction } from "react";

type TabsProps = {
  tab: string;
  setTab: (value: SetStateAction<"products" | "categories">) => void;
};

export default function Tabs({ tab, setTab }: TabsProps) {
  const classButton = (el: string) =>
    tab === el
      ? "bg-white dark:bg-gray-700 shadow text-gray-800 dark:text-gray-100"
      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200";

  return (
    <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit transition-colors">
      <button
        onClick={() => setTab("products")}
        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm transition-all ${classButton("products")}`}
      >
        <IC.LayoutGrid size={16} /> Produtos
      </button>
      <button
        onClick={() => setTab("categories")}
        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm transition-all ${classButton("categories")}`}
      >
        <IC.Tags size={16} /> Categorias
      </button>
    </div>
  );
}
