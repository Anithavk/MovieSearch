import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";

export default function Header({
  query,
  setQuery,
  type,
  setType,
  onSearch,
}) {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-gray-300 shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 space-y-2">
        <h1 className="text-lg font-bold text-center sm:text-left">
          🎬 Movie Search
        </h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={onSearch}
          />

          <FilterDropdown value={type} onChange={setType} />
        </div>
      </div>
    </header>
  );
}
