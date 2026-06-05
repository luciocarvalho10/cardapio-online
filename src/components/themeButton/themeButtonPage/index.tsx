import IC from "../../icons";
import { useMenu } from "../../../context/MenuContext";

export function ThemeButtonPage() {
  const { isDarkMode, toggleDarkMode } = useMenu();
  return (
    <button
      onClick={toggleDarkMode}
      className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/20"
      title={isDarkMode ? "Modo claro" : "Modo escuro"}
    >
      {isDarkMode ? <IC.Sun size={18} /> : <IC.Moon size={18} />}
    </button>
  );
}
