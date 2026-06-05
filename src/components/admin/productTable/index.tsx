import IC from "../../icons";
import { Product } from "../../../context/MenuContext";
import {ProductTableCard} from "./productTableCard";
import { ButtonTable } from "./buttonTable";
import { ProductCard } from "./productCard";

type ProductTableProps = {
  filteredProducts: Product[];
  toggleShowable: (product: Product) => void;
  toggleAvailable: (product: Product) => void;
  openEdit: (product: Product) => void;
  handleDelete: (id: string) => void;
  deleteConfirm: string | null;
  categories: { id: string; name: string; icon: string }[];
};

export default function ProductTable({
  filteredProducts,
  toggleShowable,
  toggleAvailable,
  openEdit,
  handleDelete,
  deleteConfirm,
  categories,
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <th className="text-left px-4 py-3 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide ">
              Produto
            </th>
            <th className="text-left px-4 py-3 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden md:table-cell">
              Categoria
            </th>
            <th className="text-left px-4 py-3 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden md:table-cell">
              Preço
            </th>
            <th className="text-center px-4 py-3 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden md:table-cell">
              Status
            </th>
            <th className="text-center px-4 py-3 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden md:table-cell">
              Mostrar
            </th>
            <th className="text-right px-4 py-3 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden md:table-cell">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
          {filteredProducts.map((product) => {
            const cat = categories.find((c) => c.id === product.categoryId);
            return (
              <tr
                key={product.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <td className="px-4 py-3 md:hidden ">
                  <ProductCard
                    cat={cat}
                    productCard={product}
                    toggleShowable={toggleShowable}
                    toggleAvailable={toggleAvailable}
                    openEdit={openEdit}
                    handleDelete={handleDelete}
                    deleteConfirm={deleteConfirm === product.id}
                  />
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <ProductTableCard product={product} />
                </td>
                <td className="px-4 py-3  hidden md:table-cell">
                  {cat && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {cat.icon} {cat.name}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span
                    className="text-sm text-amber-600 dark:text-amber-400"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                </td>
                <td className="px-4 py-3 text-center hidden md:table-cell">
                  <ButtonTable
                    active={product.showable}
                    onClick={() => toggleShowable(product)}
                    activeLabel="Disponível"
                    inactiveLabel="Indisponível"
                  />
                </td>
                <td className="px-4 py-3 text-center hidden md:table-cell">
                  <ButtonTable
                    active={product.available}
                    onClick={() => toggleAvailable(product)}
                    activeLabel="Visível"
                    inactiveLabel="Oculto"
                  />
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEdit(product)}
                      className="p-2 text-gray-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <IC.Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        deleteConfirm === product.id
                          ? "bg-red-500 text-white"
                          : "text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      }`}
                      title={
                        deleteConfirm === product.id
                          ? "Confirmar exclusão"
                          : "Excluir"
                      }
                    >
                      <IC.Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
