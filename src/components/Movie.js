import propTypes from "prop-types";
import { Link } from "react-router-dom";
import style from "../styles/Movie.module.css";

function Movie({ id, coverImg, title, summary, genres }) {
  return (
    <div className={style.moviePage}>
      <img className={style.movieImg} src={coverImg} alt={title} />
      <div>
        <h2>
          <Link className={style.title} to={`/movie/${id}`}>
            {title}
          </Link>
        </h2>
        {/*<p>{summary}</p>*/}
        <p className={style.summary}>
          {summary.length < 301 ? summary : `${summary.slice(0, 300)} ...`}
        </p>
        <ul>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
Movie.propTypes = {
  id: propTypes.number.isRequired,
  coverImg: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  summary: propTypes.string.isRequired,
  genres: propTypes.arrayOf(propTypes.string).isRequired,
};

export default Movie;
