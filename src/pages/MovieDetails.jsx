import { useState, useEffect, useRef, Suspense } from 'react';
import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import { getMovies } from 'Api/Api';
import css from 'pages/MovieDetails.module.css';
import { BiArrowBack } from 'react-icons/bi';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  const url = 'https://image.tmdb.org/t/p/w500';
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const params = `movie/${movieId}`;
    async function fetch() {
      try {
        const { data } = await getMovies(params);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [movieId]);

  const getYearMovie = date => {
    const dateMovie = new Date(date);
    const year = dateMovie.getFullYear();
    return year;
  };

  return (
    <div>
      <div className={css.wrapper}>
        <BiArrowBack />
        <Link className={css.link} to={backLinkLocationRef.current}>
          go back
        </Link>
      </div>
      <article className={css.article}>
        <img
          src={movie.poster_path ? url + movie.poster_path : ''}
          alt={movie.title}
          width="350"
          height="450"
        />
        <div>
          <h2 className={css.title}>
            {movie.title}({getYearMovie(movie.release_date)})
          </h2>
          <p>User Score: {(movie.vote_average * 10).toFixed()}%</p>
          <h3 className={css.title}>Overview</h3>
          <p className={css.text}>{movie.overview}</p>
          <h3 className={css.title}>Genres</h3>
          <p className={css.text}>
            {movie.genres
              ? movie.genres.map(genre => genre.name).join(' ')
              : ''}
          </p>
        </div>
      </article>
      <section>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </section>
    </div>
  );
};

export default MovieDetails;
