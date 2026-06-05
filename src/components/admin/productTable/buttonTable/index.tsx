import IC from "../../../icons";

type ButtonTableProps = {
  active: boolean;
  onClick: () => void;
  activeLabel: string;
  inactiveLabel: string;
  className?: string;
};

export function ButtonTable({
  active,
  onClick,
  activeLabel,
  inactiveLabel,
  className,
}: ButtonTableProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors ${
        active
          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200" +
            " dark:hover:bg-green-900/50 "
          : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 "
      } ${className}`}
    >
      {active ? <IC.Eye size={12} /> : <IC.EyeOff size={12} />}
      {active ? activeLabel : inactiveLabel}
    </button>
  );
}
