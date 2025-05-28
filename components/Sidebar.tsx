"use client";

interface SidebarProps {
  items: { label: string; terms: string[] }[];
  selected: string;
  onSelect: (label: string) => void;
}

export default function Sidebar({ items, selected, onSelect }: SidebarProps) {
  return (
    <aside className="w-48 bg-white p-4 shadow-md">
      <ul className="space-y-2">
        <li>
          <button
            className={`w-full text-left p-2 font-semibold ${
              selected === "Home"
                ? "bg-pink-700 text-white"
                : "hover:bg-pink-100"
            }`}
            onClick={() => onSelect("Home")}
          >
            Home
          </button>
        </li>
        {items.map((item) => (
          <li key={item.label}>
            <button
              className={`w-full text-left p-2 rounded ${
                selected === item.label
                  ? "bg-pink-700 text-white"
                  : "hover:bg-pink-100"
              }`}
              onClick={() => onSelect(item.label)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
