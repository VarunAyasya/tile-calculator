const labels = ['Room Info', 'Tile Info', 'Extras', 'Result'];

export default function Tabs({ current, onSelect }) {
  return (
    <div className="flex border-b">
      {labels.map((label, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
            current === i
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
