"use client";

export default function OrderItem({ item, index, onClick }) {
  return (
    <button
      onClick={() => onClick(index)}
      className={`w-full text-left px-4 py-3 rounded-md shadow-sm border transition-colors ${
        item.filled
          ? "bg-green-200 border-green-400 text-green-800"
          : "bg-white hover:bg-amber-200 border-amber-300 text-black"
      } cursor-pointer`}
    >
      <span className="font-semibold text-lg">
        {item.quantity} Dozen – {item.name}
      </span>
    </button>
  );
}
