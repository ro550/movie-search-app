import SearchBar from '../components/SearchBar';

function HomePage() {
  function handleSearch (item) {
    console.log("Searching for:", item); 
  }
  return (
    <div>
      <h1>Home Page</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}
export default HomePage;