import { useState, useEffect } from 'react';
import { getMovies } from 'Api/Api';
import { useParams } from 'react-router-dom';
import css from 'components/Reviews/Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const params = `movie/${movieId}/reviews`;
    async function fetch() {
      try {
        const { data } = await getMovies(params);
        setReviews(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [movieId]);
  return (
    <section>
      {reviews.length === 0 && <p>We don`t have any reviews for this movie</p>}
      <ul>
        {reviews.map(review => {
          return (
            <li key={review.id} className={css.item}>
              <h2>Author: {review.author}</h2>
              <p>{review.content}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Reviews;
