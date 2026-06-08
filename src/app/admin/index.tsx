import { useState } from "react";
import { useNavigate } from "react-router";

import Admin from "@/components/admin";
import { NotProduct } from "@/components/notProduct";
import { useMenu } from "@/context/menu/useMenu";
import { IProduct } from "@/interfaces/IProduct";

export type Tab = "products" | "categories";

export default function AdminDashboardPage() {
  const { categories, products, logout, updateProduct, deleteProduct } =
    useMenu();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("products");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<IProduct | null>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const openAdd = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const openEdit = (p: IProduct) => {
    setEditProduct(p);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteProduct(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const toggleAvailable = (p: IProduct) => {
    updateProduct(p.id, { available: !p.available });
  };

  const toggleShowable = (p: IProduct) => {
    updateProduct(p.id, { showable: !p.showable });
  };

  const filteredProducts = products.filter((p) => {
    const matchCat = filterCat === "all" || p.categoryId === filterCat;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Top Bar */}
      <Admin.HeaderAdminPage handleLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <Admin.Stats
          categories={categories}
          products={products}
        />

        {/* Tabs */}
        <Admin.Tabs
          setTab={setTab}
          tab={tab}
        />

        {/* Products Tab */}
        {tab === "products" && (
          <div>
            {/* Toolbar */}
            <Admin.Toolbar
              categories={categories}
              search={search}
              setSearch={setSearch}
              filterCat={filterCat}
              setFilterCat={setFilterCat}
              openAdd={openAdd}
            />

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
              {filteredProducts.length === 0 ? (
                <NotProduct />
              ) : (
                <Admin.ProductTable
                  filteredProducts={filteredProducts}
                  categories={categories}
                  deleteConfirm={deleteConfirm}
                  handleDelete={handleDelete}
                  toggleAvailable={toggleAvailable}
                  toggleShowable={toggleShowable}
                  openEdit={openEdit}
                />
              )}
            </div>

            {deleteConfirm && (
              <p className="mt-3 text-xs text-red-500 dark:text-red-400 text-center animate-pulse">
                ⚠️ Clique novamente no ícone de lixeira para confirmar a
                exclusão
              </p>
            )}
          </div>
        )}

        {/* Categories Tab */}
        {tab === "categories" && <Admin.CategoryManager />}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <Admin.ProductForm
          product={editProduct}
          onClose={() => {
            setShowForm(false);
            setEditProduct(null);
          }}
        />
      )}
    </div>
  );
}
