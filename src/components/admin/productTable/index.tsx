import IC from '@/components/icons';
import { IProduct } from '@/interfaces/IProduct';

import ProductTableComponents from './components';

type ProductTableProps = {
  filteredProducts: IProduct[];
  toggleShowable: (product: IProduct) => void;
  toggleAvailable: (product: IProduct) => void;
  openEdit: (product: IProduct) => void;
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
    <div className='overflow-x-auto'>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50'>
            <th className='px-4 py-3 text-left text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'>
              Produto
            </th>
            <th className='hidden px-4 py-3 text-left text-xs tracking-wide text-gray-500 uppercase md:table-cell dark:text-gray-400'>
              Categoria
            </th>
            <th className='hidden px-4 py-3 text-left text-xs tracking-wide text-gray-500 uppercase md:table-cell dark:text-gray-400'>
              Preço
            </th>
            <th className='hidden px-4 py-3 text-center text-xs tracking-wide text-gray-500 uppercase md:table-cell dark:text-gray-400'>
              Status
            </th>
            <th className='hidden px-4 py-3 text-center text-xs tracking-wide text-gray-500 uppercase md:table-cell dark:text-gray-400'>
              Mostrar
            </th>
            <th className='hidden px-4 py-3 text-right text-xs tracking-wide text-gray-500 uppercase md:table-cell dark:text-gray-400'>
              Ações
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-50 dark:divide-gray-800'>
          {filteredProducts.map(product => {
            const cat = categories.find(c => c.id === product.categoryId);
            return (
              <tr
                key={product.id}
                className='group transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50'>
                <td className='px-4 py-3 md:hidden'>
                  <ProductTableComponents.ProductCard
                    cat={cat}
                    productCard={product}
                    toggleShowable={toggleShowable}
                    toggleAvailable={toggleAvailable}
                    openEdit={openEdit}
                    handleDelete={handleDelete}
                    deleteConfirm={deleteConfirm === product.id}
                  />
                </td>
                <td className='hidden px-4 py-3 md:table-cell'>
                  <ProductTableComponents.ProductTableCard product={product} />
                </td>
                <td className='hidden px-4 py-3 md:table-cell'>
                  {cat && (
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      {cat.icon} {cat.name}
                    </span>
                  )}
                </td>
                <td className='hidden px-4 py-3 md:table-cell'>
                  <span
                    className='text-sm text-amber-600 dark:text-amber-400'
                    style={{ fontFamily: 'Georgia, serif' }}>
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                </td>
                <td className='hidden px-4 py-3 text-center md:table-cell'>
                  <ProductTableComponents.ButtonTable
                    active={product.showable}
                    onClick={() => toggleShowable(product)}
                    activeLabel='Disponível'
                    inactiveLabel='Indisponível'
                  />
                </td>
                <td className='hidden px-4 py-3 text-center md:table-cell'>
                  <ProductTableComponents.ButtonTable
                    active={product.available}
                    onClick={() => toggleAvailable(product)}
                    activeLabel='Visível'
                    inactiveLabel='Oculto'
                  />
                </td>
                <td className='hidden px-4 py-3 md:table-cell'>
                  <div className='flex items-center justify-end gap-1'>
                    <button
                      onClick={() => openEdit(product)}
                      className='rounded-lg p-2 text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-500 dark:text-gray-500 dark:hover:bg-amber-900/20 dark:hover:text-amber-400'
                      title='Editar'>
                      <IC.Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className={`rounded-lg p-2 transition-colors ${
                        deleteConfirm === product.id
                          ? 'bg-red-500 text-white'
                          : 'text-gray-400 hover:bg-red-50 hover:text-red-500 dark:text-gray-500 dark:hover:bg-red-900/20 dark:hover:text-red-400'
                      }`}
                      title={
                        deleteConfirm === product.id
                          ? 'Confirmar exclusão'
                          : 'Excluir'
                      }>
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
