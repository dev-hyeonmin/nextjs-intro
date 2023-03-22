import { useEffect, useState } from 'react';
import Seo from '../components/Seo';
import styles from '../styles/index.module.css';

interface movieProps {
  id: number;
  original_title: string;
  poster_path: string;
}

export default function Home() {
  const [movies, setMovies] = useState<movieProps[]>([]);

  useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(`/api/movies`)
      ).json();

      console.log(results);
      setMovies(results);
    })();
  }, []);


  return (
    <>
      <Seo title="Home" />
      <h1>Home</h1>
      
      <div>
        <ul className={styles.movie_list}>
          {movies.map((movie) => 
            <li key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
              {movie.original_title}
            </li>
          )}
        </ul>
      </div>
    </>
  )
}