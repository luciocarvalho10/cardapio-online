type ProductTableCardProps = {
  product: {
    name: string;
    description: string;
    price: number;
    image: string;
  };
};

export function ProductTableCard({ product }: ProductTableCardProps) {
  return (
    <div className="flex items-center gap-3 [640px]:hidden">
      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <p className="text-sm text-gray-800 dark:text-gray-200">
          {product.name}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1 max-w-48">
          {product.description}
        </p>
      </div>
    </div>
  );
}
