import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl mx-auto px-4 py-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie..."
        className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit"className="rounded-lg bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700 active:bg-blue-800">Search</button>
    </form>
  );
}

export default SearchBar;