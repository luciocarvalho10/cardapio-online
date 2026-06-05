import IC from "../../icons";

export function LogoPage() {
  return (
    <div className="relative text-center text-white px-4">
      <div className="flex items-center justify-center gap-3 mb-3">
        <IC.ChefHat
          size={36}
          className="text-amber-400"
        />
        <h1
          className="text-4xl md:text-5xl"
          style={{
            fontFamily: "Georgia, serif",
            letterSpacing: "0.05em",
          }}
        >
          Bella Cucina
        </h1>
      </div>
      <p className="text-amber-200 text-lg">
        Cardápio Digital · Sabores que encantam
      </p>
    </div>
  );
}
