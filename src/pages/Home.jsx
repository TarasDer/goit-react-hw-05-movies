import { useEffect, useState } from 'react';
import { getMovies } from 'Api/Api';
import { Link, useLocation } from 'react-router-dom';

const params = 'trending/movie/day';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await getMovies(params);
        setTrendingMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      <ul>
        {trendingMovies.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}/{movie.id}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
