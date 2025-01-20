import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [myjson, setMyjson] = useState({});
  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);
    setMyjson(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <h1>Detail</h1>
      <hr></hr>
      {loading ? (
        <div>Hello! Now Loading...</div>
      ) : (
        <div>
          <img src={myjson.medium_cover_image} />
          <h2>{myjson.title}</h2>
          <h3>Genres</h3>
          <ul>
            {myjson.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <p>{myjson.date_uploaded}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
