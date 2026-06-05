type CustomerProductCardProps = {
  product: {
    name: string;
    description: string;
    price: number;
    image: string;
    showable: boolean;
  };
};

export function CustomerProductCard({ product }: CustomerProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg dark:shadow-gray-900/60 dark:hover:shadow-gray-900 transition-shadow duration-300 border border-gray-100 dark:border-gray-800 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3
          className="text-gray-900 dark:text-gray-100 mb-1"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="text-xl text-amber-600 dark:text-amber-400"
            style={{
              fontFamily: "Georgia, serif",
            }}
          >
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          {product.showable ? (
            <span className="text-xs bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
              Disponível
            </span>
          ) : (
            <span className="text-xs bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full border border-red-200 dark:border-red-800">
              Indisponível
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
