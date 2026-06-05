import {
  useState,
  useRef,
  SetStateAction,
  Dispatch,
  useEffect,
  SyntheticEvent,
} from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useMenu, Category } from "../../../context/MenuContext";
import IC from "../../icons";

const COMMON_ICONS = [
  "🍽️",
  "🥗",
  "🍲",
  "🍖",
  "🐟",
  "🍝",
  "🍕",
  "🥤",
  "🍷",
  "🍺",
  "☕",
  "🍰",
  "🍮",
  "🎂",
  "🧁",
  "🍦",
];

interface DraggableCategoryItemProps {
  cat: Category;
  index: number;
  moveCategory: (dragIndex: number, hoverIndex: number) => void;
  editingId: string | null;
  editForm: { name: string; icon: string; order: number };
  setEditForm: Dispatch<
    SetStateAction<{ name: string; icon: string; order: number }>
  >;
  setEditingId: Dispatch<SetStateAction<string | null>>;
  startEdit: (cat: Category) => void;
  saveEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  deleteConfirm: string | null;
  getProductCount: (catId: string) => number;
}

function DraggableCategoryItem({
  cat,
  index,
  moveCategory,
  editingId,
  editForm,
  setEditForm,
  setEditingId,
  startEdit,
  saveEdit,
  handleDelete,
  deleteConfirm,
  getProductCount,
}: DraggableCategoryItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "CATEGORY",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CATEGORY",
    hover: (item: { index: number }) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveCategory(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors group cursor-move"
    >
      <IC.GripVertical
        size={16}
        className="text-gray-300 dark:text-gray-600 flex-shrink-0"
      />

      {editingId === cat.id ? (
        <div className="flex flex-1 gap-2 flex-wrap">
          <select
            value={editForm.icon}
            onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
            className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded-lg text-xl bg-white dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:border-amber-400 transition-colors"
          >
            {COMMON_ICONS.map((icon) => (
              <option
                key={icon}
                value={icon}
              >
                {icon}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            className="flex-1 min-w-32 px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-amber-400 bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors"
            autoFocus
          />
          <input
            type="number"
            value={editForm.order}
            onChange={(e) =>
              setEditForm({ ...editForm, order: Number(e.target.value) })
            }
            className="w-16 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-amber-400 bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors"
            min="1"
          />
          <button
            onClick={() => saveEdit(cat.id)}
            className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <IC.Check size={14} />
          </button>
          <button
            onClick={() => setEditingId(null)}
            className="p-1.5 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <IC.X size={14} />
          </button>
        </div>
      ) : (
        <>
          <span className="text-2xl">{cat.icon}</span>
          <div className="flex-1">
            <p className="text-gray-800 dark:text-gray-200 text-sm">
              {cat.name}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {getProductCount(cat.id)} produto(s) · ordem {cat.order}
            </p>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => startEdit(cat)}
              className="p-2 text-gray-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
              title="Editar"
            >
              <IC.Pencil size={15} />
            </button>
            <button
              onClick={() => handleDelete(cat.id)}
              className={`p-2 rounded-lg transition-colors ${
                deleteConfirm === cat.id
                  ? "bg-red-500 text-white"
                  : "text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              }`}
              title={
                deleteConfirm === cat.id
                  ? "Clique novamente para confirmar"
                  : "Excluir"
              }
            >
              <IC.Trash2 size={15} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function CategoryManager() {
  const { categories, products, addCategory, updateCategory, deleteCategory } =
    useMenu();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", icon: "🍽️", order: 1 });
  const [editForm, setEditForm] = useState({ name: "", icon: "", order: 0 });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [orderedCategories, setOrderedCategories] = useState<Category[]>([]);

  useEffect(() => {
    setOrderedCategories([...categories]);
  }, [categories]);

  const getProductCount = (catId: string) =>
    products.filter((p) => p.categoryId === catId).length;

  const moveCategory = (dragIndex: number, hoverIndex: number) => {
    const draggedCategory = orderedCategories[dragIndex];
    const newCategories = [...orderedCategories];
    newCategories.splice(dragIndex, 1);
    newCategories.splice(hoverIndex, 0, draggedCategory);

    // Update order values
    const updatedCategories = newCategories.map((cat, idx) => ({
      ...cat,
      order: idx + 1,
    }));

    setOrderedCategories(updatedCategories);

    // Persist the new order
    updatedCategories.forEach((cat) => {
      updateCategory(cat.id, {
        name: cat.name,
        icon: cat.icon,
        order: cat.order,
      });
    });
  };

  const handleAdd = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addCategory({ name: form.name.trim(), icon: form.icon, order: form.order });
    setForm({ name: "", icon: "🍽️", order: categories.length + 2 });
    setShowForm(false);
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditForm({ name: cat.name, icon: cat.icon, order: cat.order });
  };

  const saveEdit = (id: string) => {
    if (!editForm.name.trim()) return;
    updateCategory(id, editForm);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteCategory(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3
              className="text-gray-800 dark:text-gray-100"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Categorias
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {categories.length} categorias cadastradas
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors text-sm shadow-md"
          >
            <IC.Plus size={16} /> Nova categoria
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <form
            onSubmit={handleAdd}
            className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800"
          >
            <p className="text-sm text-amber-800 dark:text-amber-300 mb-3">
              Nova categoria
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nome da categoria"
                  className="w-full px-4 py-2 border border-amber-200 dark:border-amber-800 rounded-xl focus:outline-none focus:border-amber-400 bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 transition-colors"
                  autoFocus
                />
              </div>
              <div>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="px-3 py-2 border border-amber-200 dark:border-amber-800 rounded-xl focus:outline-none focus:border-amber-400 bg-white dark:bg-gray-800 dark:text-gray-100 text-xl transition-colors"
                >
                  {COMMON_ICONS.map((icon) => (
                    <option
                      key={icon}
                      value={icon}
                    >
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) =>
                    setForm({ ...form, order: Number(e.target.value) })
                  }
                  placeholder="Ordem"
                  min="1"
                  className="w-20 px-3 py-2 border border-amber-200 dark:border-amber-800 rounded-xl focus:outline-none focus:border-amber-400 bg-white dark:bg-gray-800 dark:text-gray-100 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors text-sm"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <IC.X size={16} />
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Categories List */}
        <div className="space-y-2">
          {orderedCategories.map((cat, index) => (
            <DraggableCategoryItem
              key={cat.id}
              cat={cat}
              index={index}
              moveCategory={moveCategory}
              editingId={editingId}
              editForm={editForm}
              setEditForm={setEditForm}
              setEditingId={setEditingId}
              startEdit={startEdit}
              saveEdit={saveEdit}
              handleDelete={handleDelete}
              deleteConfirm={deleteConfirm}
              getProductCount={getProductCount}
            />
          ))}
        </div>

        {deleteConfirm && (
          <p className="mt-3 text-xs text-red-500 dark:text-red-400 text-center animate-pulse">
            ⚠️ Clique novamente no ícone de lixeira para confirmar a exclusão
          </p>
        )}
      </div>
    </DndProvider>
  );
}
