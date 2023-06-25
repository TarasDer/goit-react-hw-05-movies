import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovies } from 'Api/Api';
import css from 'components/Cast/Cast.module.css';
const Cast = () => {
  const { movieId } = useParams();

  const url = 'https://image.tmdb.org/t/p/w500';
  const [cast, setCast] = useState([]);
  useEffect(() => {
    const params = `movie/${movieId}/credits`;
    async function fetch() {
      try {
        const { data } = await getMovies(params);
        setCast(data.cast);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [movieId]);
  return (
    <section>
      {cast.length === 0 && <p>We don`t have any cast for this movie</p>}
      <ul className={css.list}>
        {cast.map(actor => {
          return (
            <li key={actor.id} className={css.actor}>
              <img
                className={css.img}
                src={actor.profile_path ? `${url}${actor.profile_path}` : ''}
                alt={actor.name}
                width="150"
              />
              <h3 className={css.name}>{actor.name}</h3>
              <p>Character: {actor.character}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Cast;
