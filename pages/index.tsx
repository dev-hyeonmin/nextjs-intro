import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import Seo from '../components/Seo';
import styles from '../styles/index.module.css';


interface IMovieProps {
  id: number;
  backdrop_path: string;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
  genre_ids: [number];
}

function Home({ results: movies }: InferGetServerSidePropsType<GetServerSideProps>) {
  const router = useRouter();
  const onClick = (id: number, title: string) => {
    // router.push(
    //   {
    //     pathname: `/movies/${id}`,
    //     query: {
    //       title,
    //     },
    //   },
    //   `/movies/${id}`
    // );
    router.push(`/movies/${title}/${id}`);
  }
  //const [movies, setMovies] = useState<IMovieProps[]>([]);
  // useEffect(() => {
  //   (async () => {
  //     const { results } = await (
  //       await fetch(`/api/movies`)
  //     ).json();

  //     setMovies(results);
  //   })();
  // }, []);


  return (
    <>
      <Seo title="Home" />
      <h1>Home</h1>

      <div>
        <ul className={styles.movie_list}>
          {movies.map((movie: IMovieProps) =>
            <li key={movie.id} onClick={() => onClick(movie.id, movie.title)}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />

              <Link href={`/movies/${movie.original_title}/${movie.id}`}>
                {movie.original_title}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}

// SSR
export async function getServerSideProps({ }: GetServerSideProps) {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();

  return {
    props: {
      results,
    },
  };
}

export default Home;