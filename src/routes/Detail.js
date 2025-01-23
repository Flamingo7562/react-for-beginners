import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../styles/Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [myjson, setMyjson] = useState({});
  const [loading, setLoading] = useState(true);
  //const [mySummary, setMySummary] = useState(null);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);
    setMyjson(json.data.movie);
    //setMySummary(json);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  //console.log(mySummary);
  return (
    <div>
      <h1 className={style.detail}>Detail</h1>
      <hr></hr>
      {loading ? (
        <div>Hello! Now Loading...</div>
      ) : (
        <div className={style.moviePage}>
          <div>
            <img className={style.movieImg} src={myjson.medium_cover_image} />
          </div>
          <div>
            <h2 className={style.title}>{myjson.title}</h2>
            <h3>Genres</h3>
            <ul>
              {myjson.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <p className={style.summary}>
              {myjson.summary ? `${myjson.summary}` : `No Summary HERE`}
            </p>
            <p>{myjson.date_uploaded}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
