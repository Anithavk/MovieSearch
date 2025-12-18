export default function FilterDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        bg-gray-900 text-white
        border border-gray-600
        px-3 py-2 rounded
        focus:outline-none focus:ring-2 focus:ring-blue-500
        hover:border-gray-400
      "
    >
      <option value="" className="bg-white text-black">
        All
      </option>
      <option value="movie" className="bg-white text-black">
        Movie
      </option>
      <option value="series" className="bg-white text-black">
        Series
      </option>
      <option value="episode" className="bg-white text-black">
        Episode
      </option>
    </select>
  );
}
