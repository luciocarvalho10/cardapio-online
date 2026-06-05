import IC from "../../icons";

export function LogoBar() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center">
        <IC.ChefHat
          size={20}
          className="text-white"
        />
      </div>
      <div>
        <h1
          className="text-gray-900 dark:text-gray-100 leading-none text-base"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Bella Cucina
        </h1>
        <p className="text-xs text-gray-400 dark:text-gray-500">Painel Admin</p>
      </div>
    </div>
  );
}
