import { NavLink, useParams } from "react-router-dom";
import { useEffect ,useState} from "react";


const Api_Url = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const SingleMovie = () => {
  const { id } = useParams();
  const [isLoading,setIsLoading] = useState(true)
  const [movie,setMovie] = useState([])
  const getMovies = async (url) => {
    try {
      let res = await fetch(url);
      const data = await res.json();
      if (data.Response==="True"){
        setIsLoading(false)
        setMovie(data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect (()=>{
    getMovies(`${Api_Url}&i=${id}`)
  },[id])
  if (isLoading) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading...</div>;
      </section>
    );
  }
  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
