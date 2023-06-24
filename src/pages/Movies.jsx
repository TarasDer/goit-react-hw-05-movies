import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMovies } from 'Api/Api';
import { MdSearch } from 'react-icons/md';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [moviesList, setMovieisList] = useState([]);
  const [searchText, setInputText] = useState('');
  const location = useLocation();

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (query === '') return;
    setInputText(query);
    const params = 'search/movie';
    const queryParams = `query=${query}`;

    async function fetch() {
      try {
        const { data } = await getMovies(params, queryParams);
        setMovieisList(data.results);

        if (data.results.length === 0) {
          toast('Sorry, but nothing found');
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [query]);

  const handleFormSubmit = event => {
    event.preventDefault();
    const searchQuery = event.target.elements.movies.value;
    setSearchParams({ query: searchQuery });
  };

  const handleInputChange = event => {
    setInputText(event.target.value);
  };

  return (
    <section>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="movies"
          onChange={handleInputChange}
          value={searchText}
          placeholder="search movie"
        />
        <button type="submit">
          <MdSearch />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </button>
      </form>
      <ul>
        {moviesList.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Movies;
