import { useState, useEffect, SyntheticEvent } from "react";
import { Product, useMenu } from "../../../context/MenuContext";
import IC from "../../icons";

interface Props {
  product?: Product | null;
  onClose: () => void;
}

export default function ProductForm({ product, onClose }: Props) {
  const { categories, addProduct, updateProduct } = useMenu();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: categories[0]?.id || "",
    available: true,
    showable: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: product.image,
        categoryId: product.categoryId,
        available: product.available,
        showable: product.showable,
      });
    }
  }, [product]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    if (!form.description.trim()) e.description = "Descrição é obrigatória";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Preço inválido";
    if (!form.categoryId) e.categoryId = "Categoria é obrigatória";
    return e;
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const data = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      image:
        form.image.trim() ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
      categoryId: form.categoryId,
      available: form.available,
      showable: form.showable,
    };
    if (product) {
      updateProduct(product.id, data);
    } else {
      addProduct(data);
    }
    onClose();
  };

  const set = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h2
            className="text-gray-800 dark:text-gray-100"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {product ? "Editar Produto" : "Novo Produto"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <IC.X
              size={18}
              className="text-gray-500 dark:text-gray-400"
            />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >
          {/* Image Preview */}
          {form.image && (
            <div className="w-full h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img
                src={form.image}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Nome do produto *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Ex: Filé Mignon ao Molho Madeira"
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900/40 transition-all"
            />
            {errors.name && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Descrição *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Descreva os ingredientes e o preparo..."
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900/40 resize-none transition-all"
            />
            {errors.description && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Preço (R$) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="0,00"
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900/40 transition-all"
              />
              {errors.price && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                  {errors.price}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Categoria *
              </label>
              <select
                value={form.categoryId}
                onChange={(e) => set("categoryId", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900/40 transition-all"
              >
                {categories.map((c) => (
                  <option
                    key={c.id}
                    value={c.id}
                  >
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                  {errors.categoryId}
                </p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              URL da imagem
            </label>
            <div className="relative">
              <IC.ImageIcon
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              />
              <input
                type="url"
                value={form.image}
                onChange={(e) => set("image", e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900/40 transition-all"
              />
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Deixe em branco para usar imagem padrão
            </p>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => set("available", !form.available)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                form.available ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  form.available ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <label className="text-sm text-gray-700 dark:text-gray-300">
              {form.available
                ? "Disponível no cardápio"
                : "Indisponível (oculto)"}
            </label>
          </div>

          {/* Showability */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => set("showable", !form.showable)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                form.showable ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  form.showable ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <label className="text-sm text-gray-700 dark:text-gray-300">
              {form.showable ? "Mostrar no cardápio" : "Não Mostrar (oculto)"}
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors shadow-md"
            >
              {product ? "Salvar alterações" : "Adicionar produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
