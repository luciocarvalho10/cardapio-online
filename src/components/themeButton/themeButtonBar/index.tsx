import IC from "../../icons";
import { useMenu } from "../../../context/MenuContext";

export function ThemeButtonBar() {
  const { isDarkMode, toggleDarkMode } = useMenu();
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
      title={isDarkMode ? "Modo claro" : "Modo escuro"}
    >
      {isDarkMode ? <IC.Sun size={18} /> : <IC.Moon size={18} />}
    </button>
  );
}
